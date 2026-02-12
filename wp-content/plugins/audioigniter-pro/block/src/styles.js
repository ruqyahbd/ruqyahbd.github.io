import Style from './components/Style';
import Rule from './components/Style/Rule';

const AudioIgniterPlaylistStyles = ({ attributes }) => {
  const {
    uniqueId,
    backgroundColor = window.aiColors.backgroundColor,
    textColor = window.aiColors.textColor,
    accentColor = window.aiColors.accentColor,
    textOnAccentColor = window.aiColors.textOnAccentColor,
    controlColor = window.aiColors.controlColor,
    playerTextColor = window.aiColors.playerTextColor,
    playerButtonBackgroundColor = window.aiColors.playerButtonBackgroundColor,
    playerButtonTextColor = window.aiColors.playerButtonTextColor,
    playerButtonActiveColor = window.aiColors.playerButtonActiveColor,
    playerButtonActiveTextColor = window.aiColors.playerButtonActiveTextColor,
    trackBarColor = window.aiColors.trackBarColor,
    progressBarColor = window.aiColors.progressBarColor,
    trackBackgroundColor = window.aiColors.trackBackgroundColor,
    trackTextColor = window.aiColors.trackTextColor,
    activeTrackBackgroundColor = window.aiColors.activeTrackBackgroundColor,
    trackActiveTextColor = window.aiColors.trackActiveTextColor,
    trackButtonBackgroundColor = window.aiColors.trackButtonBackgroundColor,
    trackButtonTextColor = window.aiColors.trackButtonTextColor,
    lyricsModalBackgroundColor = window.aiColors.lyricsModalBackgroundColor,
    lyricsModalTextColor = window.aiColors.lyricsModalTextColor,
    backgroundImage,
  } = attributes;

  const { url, repeat, size, position, attachment } = backgroundImage;

  return (
    <Style id={`audioigniter-block-${uniqueId}`}>
      <Rule rule=".ai-wrap { background-color: %s; }" value={backgroundColor} />
      <Rule
        rule=".ai-wrap .ai-volume-bar { border-right-color: %s; }"
        value={backgroundColor}
      />
      <Rule
        rule=".ai-wrap .ai-track-btn, .ai-wrap .ai-track-control { border-left-color: %s; }"
        value={backgroundColor}
      />

      <Rule
        rule=".ai-wrap { background-image: url(%s); }"
        value={url || window.aiColors.bg_image}
      />
      <Rule
        rule=".ai-wrap { background-repeat: %s; }"
        value={repeat || window.aiColors.bg_image_repeat}
      />
      <Rule rule=".ai-wrap { background-size: %s; }" value={size} />
      <Rule
        rule=".ai-wrap { background-position: %s; }"
        value={position || window.aiColors.bg_image_position}
      />
      <Rule rule=".ai-wrap { background-attachment: %s; }" value={attachment} />

      <Rule
        rule=".ai-wrap,
				.ai-wrap .ai-btn,
				.ai-wrap .ai-track-btn { color: %s; }"
        value={textColor}
      />
      <Rule
        rule="
				.ai-wrap .ai-btn svg,
				.ai-wrap .ai-track-no-thumb svg,
				.ai-wrap .ai-track-btn svg { fill: %s; }"
        value={textColor}
      />

      <Rule
        rule=".ai-wrap .ai-audio-control,
				.ai-wrap .ai-audio-control:hover,
				.ai-wrap .ai-audio-control:focus,
				.ai-wrap .ai-track-progress,
				.ai-wrap .ai-volume-bar.ai-volume-bar-active::before,
				.ai-wrap .ai-track:hover,
				.ai-wrap .ai-track.ai-track-active,
				.ai-wrap .ai-btn.ai-btn-active { background-color: %s; }"
        value={accentColor}
      />
      <Rule
        rule=".ai-wrap .ai-scroll-wrap > div:last-child div { background-color: %s !important; }"
        value={accentColor}
      />
      <Rule
        rule="
				.ai-wrap .ai-btn:hover,
				.ai-wrap .ai-btn:focus,
				.ai-wrap .ai-footer a,
				.ai-wrap .ai-footer a:hover {
					color: %s;
				}"
        value={accentColor}
      />
      <Rule
        rule="
				.ai-wrap .ai-btn:hover svg,
				.ai-wrap .ai-btn:focus svg  {
					fill: %s;
				}"
        value={accentColor}
      />

      <Rule
        rule="
					.ai-wrap .ai-audio-control,
					.ai-wrap .ai-track:hover,
					.ai-wrap .ai-track.ai-track-active,
					.ai-wrap .ai-track.ai-track-active .ai-track-btn,
					.ai-wrap .ai-track:hover .ai-track-btn,
					.ai-wrap .ai-btn.ai-btn-active {
						color: %s;
					}
				"
        value={textOnAccentColor}
      />
      <Rule
        rule="
					.ai-wrap .ai-audio-control path,
					.ai-wrap .ai-track.ai-track-active .ai-track-btn path,
					.ai-wrap .ai-track:hover .ai-track-btn path,
					.ai-wrap .ai-btn.ai-btn-active path {
						fill: %s;
					}
				"
        value={textOnAccentColor}
      />

      <Rule
        rule="
					.ai-wrap .ai-track-progress-bar,
					.ai-wrap .ai-volume-bar,
					.ai-wrap .ai-btn,
					.ai-wrap .ai-btn:hover,
					.ai-wrap .ai-btn:focus,
					.ai-wrap .ai-track,
					.ai-wrap .ai-track-no-thumb {
						background-color: %s;
					}
				"
        value={controlColor}
      />
      <Rule
        rule="
					.ai-wrap .ai-scroll-wrap > div:last-child {
						background-color: %s;
					}
				"
        value={controlColor}
      />
      <Rule
        rule="
					.ai-wrap .ai-footer {
						border-top-color: %s;
					}
				"
        value={controlColor}
      />
      <Rule
        rule="
					.ai-wrap.ai-is-loading .ai-control-wrap-thumb::after,
					.ai-wrap.ai-is-loading .ai-track-title::after,
					.ai-wrap.ai-is-loading .ai-track-subtitle::after {
						background: %s;
					}
				"
        value={controlColor}
      />

      <Rule rule=".ai-control-wrap { color: %s; }" value={playerTextColor} />
      <Rule
        rule="
          .ai-control-wrap .ai-btn,
			    .ai-control-wrap .ai-btn:hover,
			    .ai-player-buttons .ai-btn,
			    .ai-player-buttons .ai-btn:hover,
			    .ai-wrap .ai-volume-bar {
			      background-color: %s;
			    }
        "
        value={playerButtonBackgroundColor}
      />
      <Rule
        rule="
          .ai-control-wrap .ai-audio-control,
          .ai-control-wrap .ai-audio-control:hover,
          .ai-control-wrap .ai-audio-control:focus,
          .ai-control-wrap .ai-btn.ai-btn-active,
          .ai-wrap .ai-volume-bar.ai-volume-bar-active::before {
			      background-color: %s;
			    }
        "
        value={playerButtonActiveColor}
      />
      <Rule
        rule="
          .ai-control-wrap .ai-btn,
			    .ai-control-wrap .ai-btn:hover,
			    .ai-player-buttons .ai-btn,
			    .ai-player-buttons .ai-btn:hover {
			      color: %s;
			    }
        "
        value={playerButtonTextColor}
      />
      <Rule
        rule="
          .ai-control-wrap .ai-btn svg,
			    .ai-control-wrap .ai-btn:hover svg,
			    .ai-player-buttons .ai-btn,
			    .ai-player-buttons .ai-btn:hover {
			      fill: %s;
			    }
        "
        value={playerButtonTextColor}
      />
      <Rule
        rule="
          .ai-control-wrap .ai-audio-control svg,
			    .ai-control-wrap .ai-btn.ai-btn-active {
			      fill: %s;
			    }
        "
        value={playerButtonActiveTextColor}
      />
      <Rule
        rule="
          .ai-control-wrap .ai-btn.ai-btn-active {
			      color: %s;
			    }
        "
        value={playerButtonActiveTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-progress-bar {
			      background-color: %s;
			    }
        "
        value={trackBarColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-progress {
			      background-color: %s;
			    }
        "
        value={progressBarColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track {
			      background-color: %s;
			    }
        "
        value={trackBackgroundColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track,
			    .ai-wrap .ai-track-btn {
			      color: %s;
			    }
        "
        value={trackTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-btn svg {
			      fill: %s;
			    }
        "
        value={trackTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track:hover,
			    .ai-wrap .ai-track.ai-track-active {
			      background-color: %s;
			    }
        "
        value={activeTrackBackgroundColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track:hover,
			    .ai-wrap .ai-track.ai-track-active {
			      color: %s;
			    }
        "
        value={trackActiveTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track:hover .ai-track-btn svg,
			    .ai-wrap .ai-track.ai-track-active .ai-track-btn svg {
			      fill: %s;
			    }
        "
        value={trackActiveTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-btn {
			      background-color: %s;
			    }
        "
        value={trackButtonBackgroundColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-btn {
			      color: %s;
			    }
        "
        value={trackButtonTextColor}
      />
      <Rule
        rule="
          .ai-wrap .ai-track-btn svg,
			    .ai-wrap .ai-track:hover .ai-track-btn svg,
			    .ai-wrap .ai-track.ai-track-active .ai-track-btn svg {
			      fill: %s;
			    }
        "
        value={trackButtonTextColor}
      />
      <Rule
        rule="
          .ai-modal {
			      background-color: %s;
			    }
        "
        value={lyricsModalBackgroundColor}
      />
      <Rule
        rule="
          .ai-modal,
			    .ai-modal-dismiss,
			    .ai-modal-dismiss:hover {
			      color: %s;
			    }
        "
        value={lyricsModalTextColor}
      />
    </Style>
  );
};

export default AudioIgniterPlaylistStyles;
