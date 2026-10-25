export default function SoundToggle({ enabled, unavailable, onToggle }) {
  return (
    <button
      className="sound-toggle"
      type="button"
      data-sound-toggle
      role="switch"
      aria-label="Interface sounds"
      aria-checked={enabled}
      title={unavailable ? 'Audio could not play. Click to try again.' : 'Toggle interface sounds'}
      onClick={onToggle}
    >
      <span>Sound</span>
      <span className="sound-track" aria-hidden="true">
        <span className="sound-thumb" />
      </span>
      <span className="sound-state" aria-live="polite">
        {unavailable ? 'Unavailable' : enabled ? 'On' : 'Off'}
      </span>
    </button>
  );
}
