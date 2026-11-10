import { useEffect, useMemo, useState } from 'react';
import { channelTracks, type ChannelTrack } from './workspaceData';

const STORAGE_KEY = 'lukulu-daw-pattern-v1';

function cloneTracks(tracks: ChannelTrack[]) {
  return tracks.map((track) => ({ ...track, pattern: [...track.pattern] }));
}

function loadStoredTracks() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return cloneTracks(channelTracks);
    }

    const parsedTracks = JSON.parse(storedValue) as ChannelTrack[];
    const hasValidShape = parsedTracks.every(
      (track) => typeof track.id === 'string' && Array.isArray(track.pattern),
    );

    return hasValidShape ? parsedTracks : cloneTracks(channelTracks);
  } catch {
    return cloneTracks(channelTracks);
  }
}

function hasAnySteps(track?: ChannelTrack) {
  return Boolean(track?.pattern.some(Boolean));
}

function hasFourOnFloorKick(track?: ChannelTrack) {
  if (!track) {
    return false;
  }

  return [0, 4, 8, 12].every((stepIndex) => track.pattern[stepIndex]);
}

function hasBackbeat(track?: ChannelTrack) {
  if (!track) {
    return false;
  }

  return track.pattern[4] && track.pattern[12];
}

function hasBassPocket(track?: ChannelTrack) {
  if (!track) {
    return false;
  }

  return track.pattern.filter(Boolean).length >= 4;
}

function hasMelodyMovement(track?: ChannelTrack) {
  if (!track) {
    return false;
  }

  return track.pattern.filter(Boolean).length >= 4;
}

export function useDawPattern() {
  const [tracks, setTracks] = useState<ChannelTrack[]>(loadStoredTracks);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
  }, [tracks]);

  const toggleStep = (trackId: string, stepIndex: number) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              pattern: track.pattern.map((isActive, index) =>
                index === stepIndex ? !isActive : isActive,
              ),
            }
          : track,
      ),
    );
  };

  const resetPattern = () => setTracks(cloneTracks(channelTracks));

  const lessonObjectives = useMemo(() => {
    const kick = tracks.find((track) => track.id === 'kick');
    const clap = tracks.find((track) => track.id === 'clap');
    const bass = tracks.find((track) => track.id === 'bass');
    const lead = tracks.find((track) => track.id === 'lead');

    return [
      {
        id: 'kick',
        label: 'Kick anchors bars 1, 2, 3, and 4',
        complete: hasFourOnFloorKick(kick),
      },
      {
        id: 'clap',
        label: 'Clap lands on the backbeat',
        complete: hasBackbeat(clap),
      },
      {
        id: 'bass',
        label: 'Bass has at least four pocket notes',
        complete: hasBassPocket(bass),
      },
      {
        id: 'melody',
        label: 'Melody has movement across the phrase',
        complete: hasMelodyMovement(lead),
      },
    ];
  }, [tracks]);

  const activeStepCount = useMemo(
    () =>
      tracks.reduce((total, track) => total + track.pattern.filter(Boolean).length, 0),
    [tracks],
  );

  const completedObjectiveCount = lessonObjectives.filter(
    (objective) => objective.complete,
  ).length;
  const progress = Math.round((completedObjectiveCount / lessonObjectives.length) * 100);
  const canSubmit = lessonObjectives.every((objective) => objective.complete);
  const hasPattern = tracks.some((track) => hasAnySteps(track));

  return {
    activeStepCount,
    canSubmit,
    hasPattern,
    lessonObjectives,
    progress,
    resetPattern,
    toggleStep,
    tracks,
  };
}
