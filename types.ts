export enum SquadId {
  ALPHA = 'ALPHA',
  BRAVO = 'BRAVO',
  CHARLIE = 'CHARLIE',
  NEUTRAL = 'NEUTRAL'
}

export interface Squad {
  id: SquadId;
  name: string;
  color: string;
  secondaryColor: string;
  score: number;
  members: Player[];
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  stats: {
    questionsAnswered: number;
    correctAnswers: number;
    streak: number;
  };
}

export interface Territory {
  id: string;
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  owner: SquadId;
  lockedUntil: number | null; // Timestamp
  q: number; // Hex coordinates q
  r: number; // Hex coordinates r
  prerequisiteId?: string; 
}

export interface Question {
  id: string;
  text: string;
  options: string[]; // For CQC, this might be empty
  correctAnswerIndex: number; // For CQC, ignored
  explanation: string; // Used as the "Answer" for CQC
}

export interface GameState {
  territories: Territory[];
  activeSquadId: SquadId;
  gems: number; 
  currentView: 'TITLE' | 'MAP' | 'QUEST' | 'BATTLE' | 'SQUAD' | 'TEACHER';
  selectedTerritoryId: string | null;
  activeQuest: QuestState | null;
  customQuestions: Record<string, Question[]>; 
  territoryQuestions: Record<string, Question[]>; 
  squads: Record<SquadId, Squad>;
}

export interface QuestState {
  territoryId: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  startTime: number;
  type: 'CONQUEST' | 'BATTLE' | 'CQC';
  opponentScore?: number; 
  opponentProgress?: number; 
  timeBonusAccumulated: number;
  cqcStats?: {
    attackerScore: number;
    defenderScore: number;
    defenderId: SquadId;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}
