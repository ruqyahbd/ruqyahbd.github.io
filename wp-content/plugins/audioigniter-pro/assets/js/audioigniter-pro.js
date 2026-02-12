/* eslint-env browser, jquery */
/* eslint-disable prefer-arrow-callback, prefer-template, func-names, no-var, object-shorthand, no-alert */
/* global wp ai_pro_scripts AudioIgniter */

jQuery(function ($) {
	// Return early if AudioIgniter or ai_pro_scripts are not available
	if (!AudioIgniter || !ai_pro_scripts) {
		return;
	}

	var el = AudioIgniter.elements;

	var AudioIgniterPro = (function () {
		/**
		 * Make track fields sortable
		 */
		if (el.$trackContainer.hasClass('ai-fields-sortable') && $.fn.sortable) {
			el.$trackContainer.sortable({
				placeholder: 'ai-drop-placeholder',
				forcePlaceholderSize: true,
				handle: el.fieldHeadClassName
			});
		}

		/**
		 * Batch upload audio
		 */
		el.$batchUploadButton.on('click', function () {
			var $this = $(this);
			var $container = $this
				.closest(".ai-container")
				.find(".ai-fields-container");

			AudioIgniter.wpMediaInit({
				handler: 'ai-batch-upload',
				title: ai_pro_scripts.messages.media_title_batch,
				type: 'audio',
				multiple: 'add',
				onMediaSelect: function (media) {
					var $fields = media.map(function (trackData) {
						var uuid = AudioIgniter.uuid();
						var $field = AudioIgniter.getNewTrackField(uuid);
						AudioIgniter.populateTrackField($field, trackData);
						return $field;
					});

					/* Hide all empty fields */
					$container.find(el.trackFieldClassName).each(function () {
						var $this = $(this);
						if (AudioIgniter.isTrackFieldEmpty($this)) {
							AudioIgniter.removeElement($this);
						}
					});

					$container.append($fields);
				}
			});
		});


		/**
		 * Track behavior
		 */

		/* Use track url as download checkbox */
		function handletrackDownloadUsesTrackUrlButtonText() {
			var $checkboxes = $(el.trackDownloadUsesTrackUrlClassName);
			var allChecked = $checkboxes.not(":checked").length === 0;

			if (allChecked) {
				el.$trackDownloadUsesTrackUrlButton
					.find('.js-text')
					.text(ai_pro_scripts.messages.download_audio_url_unlink);
			} else {
				el.$trackDownloadUsesTrackUrlButton
					.find('.js-text')
					.text(ai_pro_scripts.messages.download_audio_url_link);
			}
		}

		$(el.trackDownloadUsesTrackUrlClassName).each(function() {
			var $this = $(this);

			$this.on("change", function() {
				var $parentTrackField = $this.closest(el.trackFieldClassName);
				var $downloadUrlInput = $parentTrackField.find(
					el.trackDownloadUrlClassName
				);

				if ($this.is(":checked")) {
					$downloadUrlInput.attr("disabled", true);
				} else {
					$downloadUrlInput.attr("disabled", false);
				}

				handletrackDownloadUsesTrackUrlButtonText();
			});
		});

		/**
		 * Bulk sync track url with download url
		 */
		el.$trackDownloadUsesTrackUrlButton.on('click', function () {
			var $checkboxes = $(el.trackDownloadUsesTrackUrlClassName);
			var allChecked = $checkboxes.not(":checked").length === 0;

			if (allChecked) {
				if (confirm(ai_pro_scripts.messages.download_audio_url_unlink_confirm)) {
					$checkboxes.prop('checked', false).trigger('change');
				}
			} else {
				if (confirm(ai_pro_scripts.messages.download_audio_url_link_confirm)) {
					$checkboxes.prop('checked', true).trigger('change');
				}
			}
		});

		/**
		 * SoundCloud
		 */
		el.soundCloudSyncBtnClass = '.ai-sync-soundcloud';

		/**
		 * Check if a URL is from SoundCloud
		 * @param {string} url - URL to be checked
		 * @returns {number} - 0 for false
		 */
		function isSoundCloudUrl(url) {
			return ~url.indexOf('soundcloud.com');
		}

		/**
		 * Resolves a SoundCloud track URL into its track object
		 *
		 * @param {string} url - URL of SoundCloud track
		 * @param {string} clientId - SoundCloud client ID
		 * @returns {Promise.<TResult>|*}
		 */
		function resolveSoundCloudTrack(url, clientId) {
			var apiUrl = 'https://api.soundcloud.com/resolve';

			return $.ajax(apiUrl, {
				dataType: 'json',
				cache: false,
				data: {
					url: url,
					client_id: clientId || ai_pro_scripts.sc_client_id,

					/*
					* Tell the SoundCloud API not to serve a redirect. This is to get around
					* CORS issues on Safari 7+, which likes to send pre-flight requests
					* before following redirects, which has problems.
					*
					* https://github.com/soundcloud/soundcloud-javascript/issues/27
					*/
					'_status_code_map[302]': 200
				}
			})
				.then(function (res) {
					return $.ajax(res.location, {
						cache: false,
						dataType: 'json'
					});
				});
		}

		/**
		 * Given its URL, uploads an image to WordPress
		 *
		 * @param {string} url - URL of the image to be fetched and uploaded
		 * @returns {deferred}
		 */
		function uploadImage(url) {
			return $.ajax(ai_pro_scripts.ajax_url, {
				method: 'post',
				data: {
					url: url,
					action: 'ai_upload_image',
					nonce: ai_pro_scripts._ai_upload_nonce // eslint-disable-line no-underscore-dangle
				}
			});
		}

		/**
		 * Show or hide SoundCloud sync button
		 */
		el.$trackContainer
			.on('change keyup input', el.trackUrlClassName, function () {
				var $this = $(this);
				var $track = $this.parents(el.trackFieldClassName);

				if (isSoundCloudUrl($this.val())) {
					$track.addClass(el.soundCloudTrackClass);
				} else {
					$track.removeClass(el.soundCloudTrackClass);
				}
			})
			/* Bind SoundCloud sync button */
			.on('click', el.soundCloudSyncBtnClass, function () {
				var $this = $(this);
				var $track = $this.parents(el.trackFieldClassName);
				var $input = $this.siblings(el.trackUrlClassName);
				var soundcloudUrl = $input.val();

				$track.addClass('ai-track-loading');

				resolveSoundCloudTrack(soundcloudUrl)
					.then(function (track) {
						var coverUrl;

						if (track.kind !== 'track') {
							return $.Deferred(function (deferred) { // eslint-disable-line new-cap
								return deferred.reject({
									message: ai_scripts.messages.error_track_support
								});
							});
						}

						coverUrl = track.artwork_url ? track.artwork_url.replace('large', 't500x500') : '';

						AudioIgniter.populateTrackField($track, {
							title: track.title
						});

						return uploadImage(coverUrl);
					})
					.then(function (media) {
						if (!media.success) {
							return alert(media.data);
						}

						AudioIgniter.setTrackFieldCover($track, {
							id: media.data.id,
							url: media.data.url
						});
					})
					.fail(function (err) {
						var errorIntro = ai_pro_scripts.messages.error_intro;

						if (err.status === 0) {
							alert(errorIntro + ' ' + ai_pro_scrips.messages.error_missing_client_id);
						} else if (err.status === 403) {
							alert(errorIntro + ' ' + ai_pro_scrips.messages.error_disabled_embed);
						} else {
							alert(err.message || errorIntro);
						}
					})
					.always(function () {
						$track.removeClass('ai-track-loading');
					});
			});

		return {
			elements: el,
			uploadImage: uploadImage,
			resolveSoundCloudTrack: resolveSoundCloudTrack,
			isSoundCloudUrl: isSoundCloudUrl
		}
	}());

	// Expose the AudioIgniter Pro instance as a global
	if (!window.AudioIgniterPro) {
		window.AudioIgniterPro = AudioIgniterPro;
	}
});
