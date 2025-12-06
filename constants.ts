import { Squad, SquadId, Territory } from './types';

export const SQUADS: Record<SquadId, Squad> = {
  [SquadId.NEUTRAL]: {
    id: SquadId.NEUTRAL,
    name: 'Unclaimed',
    color: '#64748b', // Slate 500
    secondaryColor: '#94a3b8',
    score: 0,
    members: []
  },
  [SquadId.ALPHA]: {
    id: SquadId.ALPHA,
    name: 'Alpha Team',
    color: '#0ea5e9', // Sky 500
    secondaryColor: '#38bdf8',
    score: 0,
    members: []
  },
  [SquadId.BRAVO]: {
    id: SquadId.BRAVO,
    name: 'Bravo Team',
    color: '#ef4444', // Red 500
    secondaryColor: '#f87171',
    score: 0,
    members: []
  },
  [SquadId.CHARLIE]: {
    id: SquadId.CHARLIE,
    name: 'Charlie Team',
    color: '#22c55e', // Green 500
    secondaryColor: '#4ade80',
    score: 0,
    members: []
  }
};

// Sequential path removed. All available.
export const INITIAL_TERRITORIES: Territory[] = [
  { id: 't1', name: 'Seeds of Conflict', description: 'Treaty of Versailles & Rise of Dictators', difficulty: 1, owner: SquadId.NEUTRAL, lockedUntil: null, q: 0, r: 0 },
  { id: 't2', name: 'Expansionism', description: 'Annexation of Austria & Sudetenland', difficulty: 2, owner: SquadId.NEUTRAL, lockedUntil: null, q: 1, r: -1 },
  { id: 't3', name: 'Blitzkrieg Begins', description: 'Invasion of Poland (1939)', difficulty: 2, owner: SquadId.NEUTRAL, lockedUntil: null, q: 2, r: -2 },
  { id: 't4', name: 'Fall of France', description: 'Dunkirk & The Maginot Line', difficulty: 3, owner: SquadId.NEUTRAL, lockedUntil: null, q: 3, r: -2 },
  { id: 't5', name: 'Battle of Britain', description: 'The RAF vs The Luftwaffe', difficulty: 3, owner: SquadId.NEUTRAL, lockedUntil: null, q: 3, r: -1 },
  { id: 't6', name: 'Operation Barbarossa', description: 'Invasion of the Soviet Union', difficulty: 4, owner: SquadId.NEUTRAL, lockedUntil: null, q: 2, r: 0 },
  { id: 't7', name: 'Day of Infamy', description: 'Pearl Harbor (Dec 1941)', difficulty: 2, owner: SquadId.NEUTRAL, lockedUntil: null, q: 1, r: 1 },
  { id: 't8', name: 'Pacific Turning Point', description: 'Battles of Midway & Coral Sea', difficulty: 4, owner: SquadId.NEUTRAL, lockedUntil: null, q: 0, r: 2 },
  { id: 't9', name: 'North Africa', description: 'El Alamein & Torch', difficulty: 3, owner: SquadId.NEUTRAL, lockedUntil: null, q: -1, r: 2 },
  { id: 't10', name: 'Eastern Front Turn', description: 'Battle of Stalingrad', difficulty: 5, owner: SquadId.NEUTRAL, lockedUntil: null, q: -2, r: 2 },
  { id: 't11', name: 'Fortress Europe', description: 'Invasion of Italy', difficulty: 3, owner: SquadId.NEUTRAL, lockedUntil: null, q: -2, r: 1 },
  { id: 't12', name: 'The Longest Day', description: 'D-Day (Operation Overlord)', difficulty: 5, owner: SquadId.NEUTRAL, lockedUntil: null, q: -1, r: 0 },
  { id: 't13', name: 'Victory in Europe', description: 'Fall of Berlin & V-E Day', difficulty: 5, owner: SquadId.NEUTRAL, lockedUntil: null, q: -1, r: -1 },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Instructor',
  squadId: SquadId.ALPHA,
  avatar: 'https://picsum.photos/200'
};

export const INITIAL_CHAT: any[] = [];
