import { FormatInt } from "..";
import {
	BMSGenocideDans,
	BMSLNDans,
	BMSScratchDans,
	BMSStSlDans,
	CHUNITHMColours,
	DDRDans,
	GitadoraColours,
	IIDXDans,
	JubeatColours,
	PMSDans,

	// PMSDans,
	PopnClasses,
	SDVXDans,
	SDVXVFClasses,
	WaccaColours,
	WaccaStageUps,
} from "../game-classes";
import { FormatSieglindeBMS, FormatSieglindePMS } from "../utils/util";
import type { GPTTierlists } from "..";
import type { ClassInfo, GameClassSets } from "../game-classes";
import type { ESDJudgementFormat } from "../lib/esd";
import type {
	Playtypes,
	Game,
	Difficulties,
	IDStrings,
	ScoreCalculatedDataLookup,
	SessionCalculatedDataLookup,
	UGSRatingsLookup,
	Grades,
	Lamps,
	JudgementLookup,
	GPTSupportedVersions,
} from "../types";

export interface GameConfig<G extends Game = Game> {
	internalName: string;
	name: string;
	defaultPlaytype: Playtypes[G];
	validPlaytypes: Array<Playtypes[G]>;
}

interface BaseGamePTConfig<I extends IDStrings> {
	idString: I;

	percentMax: number;

	defaultScoreRatingAlg: ScoreCalculatedDataLookup[I];
	defaultSessionRatingAlg: SessionCalculatedDataLookup[I];
	defaultProfileRatingAlg: UGSRatingsLookup[I];

	scoreRatingAlgs: Array<ScoreCalculatedDataLookup[I]>;
	sessionRatingAlgs: Array<SessionCalculatedDataLookup[I]>;
	profileRatingAlgs: Array<UGSRatingsLookup[I]>;

	scoreRatingAlgDescriptions: Record<ScoreCalculatedDataLookup[I], string>;
	sessionRatingAlgDescriptions: Record<SessionCalculatedDataLookup[I], string>;
	profileRatingAlgDescriptions: Record<UGSRatingsLookup[I], string>;

	scoreRatingAlgFormatters: Partial<Record<ScoreCalculatedDataLookup[I], (v: number) => string>>;
	sessionRatingAlgFormatters: Partial<
		Record<SessionCalculatedDataLookup[I], (v: number) => string>
	>;
	profileRatingAlgFormatters: Partial<Record<UGSRatingsLookup[I], (v: number) => string>>;

	difficulties: Array<Difficulties[I]>;
	shortDifficulties: Partial<Record<Difficulties[I], string>>;
	defaultDifficulty: Difficulties[I];
	difficultyColours: Record<Difficulties[I], string | null>;

	grades: Array<Grades[I]>;
	gradeColours: Record<Grades[I], string>;
	clearGrade: Grades[I];
	gradeBoundaries: Array<number> | null;

	lamps: Array<Lamps[I]>;
	lampColours: Record<Lamps[I], string>;
	clearLamp: Lamps[I];

	classHumanisedFormat: Record<GameClassSets[I], Array<ClassInfo>>;

	judgements: Array<JudgementLookup[I]>;

	scoreBucket: "grade" | "lamp";

	supportedVersions: Array<GPTSupportedVersions[I]>;

	tierlists: Array<GPTTierlists[I]>;
	tierlistDescriptions: Record<GPTTierlists[I], string>;
}

interface GamePTConfigWithESD<I extends IDStrings> extends BaseGamePTConfig<I> {
	supportsESD: true;
	judgementWindows: Array<ESDJudgementFormat>;
}

interface GamePTConfigWithoutESD<I extends IDStrings> extends BaseGamePTConfig<I> {
	supportsESD: false;
}

export type GamePTConfig<I extends IDStrings = IDStrings> =
	| GamePTConfigWithESD<I>
	| GamePTConfigWithoutESD<I>;

/**
 * A collection of CSS colours we want to work with.
 */
export const COLOUR_SET = {
	gray: "rgba(105, 105, 105, 1)",
	maroon: "rgba(85, 17, 17, 1)",
	red: "rgba(170, 85, 85, 1)",
	paleGreen: "rgba(142,174,79, 1)",
	paleBlue: "rgba(92, 97, 153, 1)",
	green: "rgba(50, 205, 50, 1)",
	darkGreen: "rgba(30, 130, 76, 1)",
	blue: "rgba(70, 130, 180, 1)",
	gold: "rgba(255, 215, 0, 1)",
	vibrantYellow: "rgba(245, 229, 27, 1)",
	teal: "rgba(127, 255, 212, 1)",
	white: "rgba(192, 192, 192, 1)",
	purple: "rgba(153, 50, 204, 1)",
	vibrantPurple: "rgba(161, 23, 230, 1)",
	paleOrange: "rgba(235, 151, 78, 1)",
	orange: "rgba(248, 148, 6, 1)",
	vibrantOrange: "rgba(248, 175, 6, 1)",
	vibrantBlue: "rgba(43, 149, 237, 1)",
	vibrantGreen: "rgba(26, 232, 26, 1)",
	vibrantRed: "rgba(243, 23, 45, 1)",
	pink: "rgba(255, 182, 193, 1)",
	vibrantPink: "rgba(255, 105, 180, 1)",
};

type GameConfigs = {
	[G in Game]: GameConfig<G>;
};

const GAME_CONFIGS: GameConfigs = {
	iidx: {
		defaultPlaytype: "SP",
		name: "beatmania IIDX",
		internalName: "iidx",
		validPlaytypes: ["SP", "DP"],
	},
	museca: {
		defaultPlaytype: "Single",
		name: "MÚSECA",
		internalName: "museca",
		validPlaytypes: ["Single"],
	},
	chunithm: {
		defaultPlaytype: "Single",
		name: "CHUNITHM",
		internalName: "chunithm",
		validPlaytypes: ["Single"],
	},
	ddr: {
		defaultPlaytype: "SP",
		name: "DDR", // used to be 'Dance Dance Revolution', is now DDR for space reasons.
		internalName: "ddr",
		validPlaytypes: ["SP", "DP"],
	},
	bms: {
		defaultPlaytype: "7K",
		name: "BMS",
		internalName: "bms",
		validPlaytypes: ["7K", "14K"],
	},
	gitadora: {
		defaultPlaytype: "Dora",
		name: "GITADORA",
		internalName: "gitadora",
		validPlaytypes: ["Gita", "Dora"],
	},
	jubeat: {
		defaultPlaytype: "Single",
		name: "jubeat",
		internalName: "jubeat",
		validPlaytypes: ["Single"],
	},
	maimai: {
		defaultPlaytype: "Single",
		name: "maimai",
		internalName: "maimai",
		validPlaytypes: ["Single"],
	},
	popn: {
		defaultPlaytype: "9B",
		name: "pop'n music",
		internalName: "popn", // note: KAI servers use pnm as a name.
		validPlaytypes: ["9B"],
	},
	sdvx: {
		defaultPlaytype: "Single",
		name: "SOUND VOLTEX",
		internalName: "sdvx",
		validPlaytypes: ["Single"],
	},
	usc: {
		defaultPlaytype: "Controller",
		name: "USC",
		internalName: "usc",
		validPlaytypes: ["Controller", "Keyboard"],
	},
	wacca: {
		defaultPlaytype: "Single",
		name: "WACCA",
		internalName: "wacca",
		validPlaytypes: ["Single"],
	},
	pms: {
		defaultPlaytype: "Controller",
		internalName: "pms",
		name: "PMS",
		validPlaytypes: ["Controller", "Keyboard"],
	},
	itg: {
		defaultPlaytype: "Stamina",
		internalName: "itg",
		name: "ITG",
		validPlaytypes: ["Stamina"],
	},
};

type GamePTConfigs = {
	[I in IDStrings]: GamePTConfig<I>;
};

const GAME_PT_CONFIGS: GamePTConfigs = {
	"iidx:SP": {
		idString: "iidx:SP",

		percentMax: 100,

		defaultScoreRatingAlg: "ktLampRating",
		defaultSessionRatingAlg: "ktLampRating",
		defaultProfileRatingAlg: "ktLampRating",

		scoreRatingAlgs: ["ktLampRating", "BPI"],
		sessionRatingAlgs: ["ktLampRating", "BPI"],
		profileRatingAlgs: ["ktLampRating", "BPI"],

		scoreRatingAlgDescriptions: {
			ktLampRating: `A rating system that values your clear lamps on charts. Tierlist information is taken into account.`,
			BPI: `A rating system for Kaiden level play. Only applies to 11s and 12s. A BPI of 0 states the score is equal to the Kaiden Average for that chart. A BPI of 100 is equal to the world record.`,
		},
		profileRatingAlgDescriptions: {
			ktLampRating: `An average of your best 20 ktLampRatings.`,
			BPI: `An average of your best 20 BPIs.`,
		},
		sessionRatingAlgDescriptions: {
			ktLampRating: `An average of the best 10 ktLampRatings this session.`,
			BPI: `An average of the best 10 BPIs this session.`,
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: [
			"BEGINNER",
			"NORMAL",
			"HYPER",
			"ANOTHER",
			"LEGGENDARIA",
			"All Scratch BEGINNER",
			"All Scratch NORMAL",
			"All Scratch HYPER",
			"All Scratch ANOTHER",
			"All Scratch LEGGENDARIA",
			"Kichiku BEGINNER",
			"Kichiku NORMAL",
			"Kichiku HYPER",
			"Kichiku ANOTHER",
			"Kichiku LEGGENDARIA",
			"Kiraku BEGINNER",
			"Kiraku NORMAL",
			"Kiraku HYPER",
			"Kiraku ANOTHER",
			"Kiraku LEGGENDARIA",
		],
		shortDifficulties: {
			BEGINNER: "B",
			NORMAL: "N",
			HYPER: "H",
			ANOTHER: "A",
			LEGGENDARIA: "L",
			"All Scratch BEGINNER": "B (Scr.)",
			"All Scratch NORMAL": "N (Scr.)",
			"All Scratch HYPER": "H (Scr.)",
			"All Scratch ANOTHER": "A (Scr.)",
			"All Scratch LEGGENDARIA": "L (Scr.)",
			"Kichiku BEGINNER": "B (Kc.)",
			"Kichiku NORMAL": "N (Kc.)",
			"Kichiku HYPER": "H (Kc.)",
			"Kichiku ANOTHER": "A (Kc.)",
			"Kichiku LEGGENDARIA": "L (Kc.)",
			"Kiraku BEGINNER": "B (Kr.)",
			"Kiraku NORMAL": "N (Kr.)",
			"Kiraku HYPER": "H (Kr.)",
			"Kiraku ANOTHER": "A (Kr.)",
			"Kiraku LEGGENDARIA": "L (Kr.)",
		},
		defaultDifficulty: "ANOTHER",
		difficultyColours: {
			BEGINNER: COLOUR_SET.paleGreen,
			NORMAL: COLOUR_SET.blue,
			HYPER: COLOUR_SET.orange,
			ANOTHER: COLOUR_SET.red,
			LEGGENDARIA: COLOUR_SET.purple,
			"All Scratch BEGINNER": COLOUR_SET.paleGreen,
			"All Scratch NORMAL": COLOUR_SET.blue,
			"All Scratch HYPER": COLOUR_SET.orange,
			"All Scratch ANOTHER": COLOUR_SET.red,
			"All Scratch LEGGENDARIA": COLOUR_SET.purple,
			"Kichiku BEGINNER": COLOUR_SET.paleGreen,
			"Kichiku NORMAL": COLOUR_SET.blue,
			"Kichiku HYPER": COLOUR_SET.orange,
			"Kichiku ANOTHER": COLOUR_SET.red,
			"Kichiku LEGGENDARIA": COLOUR_SET.purple,
			"Kiraku BEGINNER": COLOUR_SET.paleGreen,
			"Kiraku NORMAL": COLOUR_SET.blue,
			"Kiraku HYPER": COLOUR_SET.orange,
			"Kiraku ANOTHER": COLOUR_SET.red,
			"Kiraku LEGGENDARIA": COLOUR_SET.purple,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// IIDX has some unhinged grade boundaries...
		// You might think these two lines are identical, but they are not. The order of operations affects
		// floating point math at this point.
		// gradeBoundaries: [0, 2/9, 3/9, 4/9, 5/9, 6/9, 7/9, 8/9, 17/18, 9/9].map(e => e * 100),
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: IIDXDans,
		},

		supportsESD: true,
		judgementWindows: [
			{ name: "PGREAT", msBorder: 16.667, value: 2 },
			{ name: "GREAT", msBorder: 33.333, value: 1 },
			{ name: "GOOD", msBorder: 116.667, value: 0 },
		],
		judgements: ["pgreat", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [
			"3-cs",
			"4-cs",
			"5-cs",
			"6-cs",
			"7-cs",
			"8-cs",
			"9-cs",
			"10-cs",
			"11-cs",
			"12-cs",
			"13-cs",
			"14-cs",
			"15-cs",
			"16-cs",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"26-omni",
			"27-omni",
			"28-omni",
			"27-2dxtra",
			"28-2dxtra",
			"bmus",
			"inf",
		],

		tierlists: ["kt-NC", "kt-HC", "kt-EXHC"],
		tierlistDescriptions: {
			"kt-NC":
				"The Normal Clear tiers for Kamaitachi. These are adapted from multiple sources.",
			"kt-HC":
				"The Hard Clear tiers for Kamaitachi. These are adapted from multiple sources.",
			"kt-EXHC":
				"The EX-HARD Clear tiers for Kamaitachi. These are adapted from multiple sources.",
		},
	},
	"iidx:DP": {
		idString: "iidx:DP",

		percentMax: 100,

		defaultScoreRatingAlg: "ktLampRating",
		defaultSessionRatingAlg: "ktLampRating",
		defaultProfileRatingAlg: "ktLampRating",

		scoreRatingAlgs: ["ktLampRating", "BPI"],
		sessionRatingAlgs: ["ktLampRating", "BPI"],
		profileRatingAlgs: ["ktLampRating", "BPI"],

		scoreRatingAlgDescriptions: {
			ktLampRating: `A rating system that values your clear lamps on charts. Tierlist information is taken into account.`,
			BPI: `A rating system for Kaiden level play. Only applies to 11s and 12s. A BPI of 0 states the score is equal to the Kaiden Average for that chart. A BPI of 100 is equal to the world record.`,
		},
		profileRatingAlgDescriptions: {
			ktLampRating: `An average of your best 20 ktLampRatings.`,
			BPI: `An average of your best 20 BPIs.`,
		},
		sessionRatingAlgDescriptions: {
			ktLampRating: `An average of the best 10 ktLampRatings this session.`,
			BPI: `An average of the best 10 BPIs this session.`,
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: [
			"NORMAL",
			"HYPER",
			"ANOTHER",
			"LEGGENDARIA",
			"All Scratch NORMAL",
			"All Scratch HYPER",
			"All Scratch ANOTHER",
			"All Scratch LEGGENDARIA",
			"Kichiku NORMAL",
			"Kichiku HYPER",
			"Kichiku ANOTHER",
			"Kichiku LEGGENDARIA",
			"Kiraku NORMAL",
			"Kiraku HYPER",
			"Kiraku ANOTHER",
			"Kiraku LEGGENDARIA",
		],
		shortDifficulties: {
			NORMAL: "N",
			HYPER: "H",
			ANOTHER: "A",
			LEGGENDARIA: "L",
			"All Scratch NORMAL": "N (Scr.)",
			"All Scratch HYPER": "H (Scr.)",
			"All Scratch ANOTHER": "A (Scr.)",
			"All Scratch LEGGENDARIA": "L (Scr.)",
			"Kichiku NORMAL": "N (Kc.)",
			"Kichiku HYPER": "H (Kc.)",
			"Kichiku ANOTHER": "A (Kc.)",
			"Kichiku LEGGENDARIA": "L (Kc.)",
			"Kiraku NORMAL": "N (Kr.)",
			"Kiraku HYPER": "H (Kr.)",
			"Kiraku ANOTHER": "A (Kr.)",
			"Kiraku LEGGENDARIA": "L (Kr.)",
		},
		defaultDifficulty: "ANOTHER",
		difficultyColours: {
			NORMAL: COLOUR_SET.blue,
			HYPER: COLOUR_SET.orange,
			ANOTHER: COLOUR_SET.red,
			LEGGENDARIA: COLOUR_SET.purple,
			"All Scratch NORMAL": COLOUR_SET.blue,
			"All Scratch HYPER": COLOUR_SET.orange,
			"All Scratch ANOTHER": COLOUR_SET.red,
			"All Scratch LEGGENDARIA": COLOUR_SET.purple,
			"Kichiku NORMAL": COLOUR_SET.blue,
			"Kichiku HYPER": COLOUR_SET.orange,
			"Kichiku ANOTHER": COLOUR_SET.red,
			"Kichiku LEGGENDARIA": COLOUR_SET.purple,
			"Kiraku NORMAL": COLOUR_SET.blue,
			"Kiraku HYPER": COLOUR_SET.orange,
			"Kiraku ANOTHER": COLOUR_SET.red,
			"Kiraku LEGGENDARIA": COLOUR_SET.purple,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// see iidx:SP for an explaination of why this is wrote like this.
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: IIDXDans,
		},

		supportsESD: true,
		judgementWindows: [
			{ name: "PGREAT", msBorder: 16.667, value: 2 },
			{ name: "GREAT", msBorder: 33.333, value: 1 },
			{ name: "GOOD", msBorder: 116.667, value: 0 },
		],
		judgements: ["pgreat", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [
			"3-cs",
			"4-cs",
			"5-cs",
			"6-cs",
			"7-cs",
			"8-cs",
			"9-cs",
			"10-cs",
			"11-cs",
			"12-cs",
			"13-cs",
			"14-cs",
			"15-cs",
			"16-cs",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"26-omni",
			"27-omni",
			"28-omni",
			"27-2dxtra",
			"28-2dxtra",
			"bmus",
			"inf",
		],

		tierlists: ["dp-tier"],
		tierlistDescriptions: {
			"dp-tier": "The unofficial DP tiers, taken from https://zasa.sakura.ne.jp/dp/run.php.",
		},
	},
	"chunithm:Single": {
		idString: "chunithm:Single",
		percentMax: 101,

		defaultScoreRatingAlg: "rating",
		defaultSessionRatingAlg: "naiveRating",
		defaultProfileRatingAlg: "naiveRating",

		scoreRatingAlgs: ["rating"],
		sessionRatingAlgs: ["naiveRating"],
		profileRatingAlgs: ["naiveRating"],

		scoreRatingAlgDescriptions: {
			rating: "The rating value of this score. This is identical to the system used in game.",
		},
		profileRatingAlgDescriptions: {
			naiveRating:
				"The average of your best 20 ratings. This is different to in-game, as it does not take into account your recent scores in any way.",
		},
		sessionRatingAlgDescriptions: {
			naiveRating: "The average of your best 10 ratings this session.",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["BASIC", "ADVANCED", "EXPERT", "MASTER"],
		shortDifficulties: {
			BASIC: "B",
			ADVANCED: "A",
			EXPERT: "E",
			MASTER: "M",
		},
		defaultDifficulty: "MASTER",
		difficultyColours: {
			BASIC: COLOUR_SET.blue,
			ADVANCED: COLOUR_SET.orange,
			EXPERT: COLOUR_SET.red,
			MASTER: COLOUR_SET.purple,
		},

		grades: ["D", "C", "B", "BB", "BBB", "A", "AA", "AAA", "S", "SS", "SSS"],
		gradeColours: {
			D: COLOUR_SET.red,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			BB: COLOUR_SET.blue,
			BBB: COLOUR_SET.vibrantBlue,
			A: COLOUR_SET.paleGreen,
			AA: COLOUR_SET.green,
			AAA: COLOUR_SET.vibrantGreen,
			S: COLOUR_SET.vibrantOrange,
			SS: COLOUR_SET.vibrantYellow,
			SSS: COLOUR_SET.teal,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 50, 60, 70, 80, 90, 92.5, 95.0, 97.5, 100, 100.75],

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "ALL JUSTICE", "ALL JUSTICE CRITICAL"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.paleGreen,
			"FULL COMBO": COLOUR_SET.paleBlue,
			"ALL JUSTICE": COLOUR_SET.gold,
			"ALL JUSTICE CRITICAL": COLOUR_SET.white,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			colour: CHUNITHMColours,
		},

		supportsESD: false,
		judgements: ["jcrit", "justice", "attack", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["paradiselost"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"sdvx:Single": {
		idString: "sdvx:Single",
		percentMax: 100,

		defaultScoreRatingAlg: "VF6",
		defaultSessionRatingAlg: "ProfileVF6",
		defaultProfileRatingAlg: "VF6",

		scoreRatingAlgs: ["VF6"],
		sessionRatingAlgs: ["ProfileVF6", "VF6"],
		profileRatingAlgs: ["VF6"],

		scoreRatingAlgDescriptions: {
			VF6: "VOLFORCE as it is implemented in SDVX6.",
		},
		profileRatingAlgDescriptions: {
			VF6: "Your best 50 VF6 values added together.",
		},
		sessionRatingAlgDescriptions: {
			VF6: "The average of your best 10 VF6s this session.",
			ProfileVF6:
				"The average of your best 10 VF6s this session, multiplied to be on the same scale as profile VOLFORCE.",
		},

		scoreRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		profileRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		sessionRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
			ProfileVF6: (v) => v.toFixed(3),
		},

		difficulties: ["NOV", "ADV", "EXH", "INF", "GRV", "HVN", "VVD", "XCD", "MXM"],
		shortDifficulties: {}, // they're all fine
		defaultDifficulty: "EXH",
		difficultyColours: {
			NOV: COLOUR_SET.purple, // colour set dark purple
			ADV: COLOUR_SET.vibrantYellow,
			EXH: COLOUR_SET.red,
			INF: COLOUR_SET.vibrantPink,
			GRV: COLOUR_SET.orange,
			HVN: COLOUR_SET.teal,
			VVD: COLOUR_SET.pink,
			XCD: COLOUR_SET.blue,
			MXM: COLOUR_SET.white,
		},

		grades: ["D", "C", "B", "A", "A+", "AA", "AA+", "AAA", "AAA+", "S", "PUC"],
		gradeColours: {
			D: COLOUR_SET.gray,
			C: COLOUR_SET.red,
			B: COLOUR_SET.maroon,
			A: COLOUR_SET.paleBlue,
			"A+": COLOUR_SET.blue,
			AA: COLOUR_SET.paleGreen,
			"AA+": COLOUR_SET.green,
			AAA: COLOUR_SET.gold,
			"AAA+": COLOUR_SET.vibrantOrange,
			S: COLOUR_SET.teal,
			PUC: COLOUR_SET.pink,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 70, 80, 87, 90, 93, 95, 97, 98, 99, 100],

		lamps: ["FAILED", "CLEAR", "EXCESSIVE CLEAR", "ULTIMATE CHAIN", "PERFECT ULTIMATE CHAIN"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.green,
			"EXCESSIVE CLEAR": COLOUR_SET.purple,
			"ULTIMATE CHAIN": COLOUR_SET.teal,
			"PERFECT ULTIMATE CHAIN": COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: SDVXDans,
			vfClass: SDVXVFClasses,
		},

		supportsESD: false,
		judgements: ["critical", "near", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["booth", "inf", "gw", "heaven", "vivid", "exceed", "konaste"],

		tierlists: ["clear"],
		tierlistDescriptions: {
			clear: "Clearing values taken from the unofficial SDVX spreadsheet tierlists.",
		},
	},
	"usc:Controller": {
		idString: "usc:Controller",
		percentMax: 100,

		defaultScoreRatingAlg: "VF6",
		defaultSessionRatingAlg: "ProfileVF6",
		defaultProfileRatingAlg: "VF6",

		scoreRatingAlgs: ["VF6"],
		sessionRatingAlgs: ["ProfileVF6", "VF6"],
		profileRatingAlgs: ["VF6"],

		scoreRatingAlgDescriptions: {
			VF6: "VOLFORCE as it is implemented in SDVX6.",
		},
		profileRatingAlgDescriptions: {
			VF6: "Your best 50 VF6 values added together.",
		},
		sessionRatingAlgDescriptions: {
			VF6: "The average of your best 10 VF6s this session.",
			ProfileVF6:
				"The average of your best 10 VF6s this session, multiplied to be on the same scale as profile VOLFORCE.",
		},

		scoreRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		profileRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		sessionRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
			ProfileVF6: (v) => v.toFixed(3),
		},

		difficulties: ["NOV", "ADV", "EXH", "INF"],
		shortDifficulties: {}, // all fine
		defaultDifficulty: "EXH",
		difficultyColours: {
			NOV: COLOUR_SET.purple, // colour set dark purple
			ADV: COLOUR_SET.vibrantYellow,
			EXH: COLOUR_SET.red,
			INF: COLOUR_SET.vibrantPink,
		},

		grades: ["D", "C", "B", "A", "A+", "AA", "AA+", "AAA", "AAA+", "S", "PUC"],
		gradeColours: {
			D: COLOUR_SET.gray,
			C: COLOUR_SET.red,
			B: COLOUR_SET.maroon,
			A: COLOUR_SET.paleBlue,
			"A+": COLOUR_SET.blue,
			AA: COLOUR_SET.paleGreen,
			"AA+": COLOUR_SET.green,
			AAA: COLOUR_SET.gold,
			"AAA+": COLOUR_SET.vibrantOrange,
			S: COLOUR_SET.teal,
			PUC: COLOUR_SET.pink,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 70, 80, 87, 90, 93, 95, 97, 98, 99, 100],

		lamps: ["FAILED", "CLEAR", "EXCESSIVE CLEAR", "ULTIMATE CHAIN", "PERFECT ULTIMATE CHAIN"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.green,
			"EXCESSIVE CLEAR": COLOUR_SET.orange,
			"ULTIMATE CHAIN": COLOUR_SET.teal,
			"PERFECT ULTIMATE CHAIN": COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {},

		supportsESD: false,
		judgements: ["critical", "near", "miss"],

		scoreBucket: "grade",

		supportedVersions: [],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"usc:Keyboard": {
		idString: "usc:Keyboard",
		percentMax: 100,

		defaultScoreRatingAlg: "VF6",
		defaultSessionRatingAlg: "ProfileVF6",
		defaultProfileRatingAlg: "VF6",

		scoreRatingAlgs: ["VF6"],
		sessionRatingAlgs: ["ProfileVF6", "VF6"],
		profileRatingAlgs: ["VF6"],

		scoreRatingAlgDescriptions: {
			VF6: "VOLFORCE as it is implemented in SDVX6.",
		},
		profileRatingAlgDescriptions: {
			VF6: "Your best 50 VF6 values added together.",
		},
		sessionRatingAlgDescriptions: {
			VF6: "The average of your best 10 VF6s this session.",
			ProfileVF6:
				"The average of your best 10 VF6s this session, multiplied to be on the same scale as profile VOLFORCE.",
		},

		scoreRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		profileRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
		},
		sessionRatingAlgFormatters: {
			VF6: (v) => v.toFixed(3),
			ProfileVF6: (v) => v.toFixed(3),
		},

		difficulties: ["NOV", "ADV", "EXH", "INF"],
		shortDifficulties: {}, // all fine
		defaultDifficulty: "EXH",
		difficultyColours: {
			NOV: COLOUR_SET.purple, // colour set dark purple
			ADV: COLOUR_SET.vibrantYellow,
			EXH: COLOUR_SET.red,
			INF: COLOUR_SET.vibrantPink,
		},

		grades: ["D", "C", "B", "A", "A+", "AA", "AA+", "AAA", "AAA+", "S", "PUC"],
		gradeColours: {
			D: COLOUR_SET.gray,
			C: COLOUR_SET.red,
			B: COLOUR_SET.maroon,
			A: COLOUR_SET.paleBlue,
			"A+": COLOUR_SET.blue,
			AA: COLOUR_SET.paleGreen,
			"AA+": COLOUR_SET.green,
			AAA: COLOUR_SET.gold,
			"AAA+": COLOUR_SET.vibrantOrange,
			S: COLOUR_SET.teal,
			PUC: COLOUR_SET.pink,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 70, 80, 87, 90, 93, 95, 97, 98, 99, 100],

		lamps: ["FAILED", "CLEAR", "EXCESSIVE CLEAR", "ULTIMATE CHAIN", "PERFECT ULTIMATE CHAIN"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.green,
			"EXCESSIVE CLEAR": COLOUR_SET.orange,
			"ULTIMATE CHAIN": COLOUR_SET.teal,
			"PERFECT ULTIMATE CHAIN": COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {},

		supportsESD: false,
		judgements: ["critical", "near", "miss"],

		scoreBucket: "grade",

		supportedVersions: [],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"museca:Single": {
		idString: "museca:Single",
		percentMax: 100,

		defaultScoreRatingAlg: "ktRating",
		defaultSessionRatingAlg: "ktRating",
		defaultProfileRatingAlg: "ktRating",

		scoreRatingAlgs: ["ktRating"],
		sessionRatingAlgs: ["ktRating"],
		profileRatingAlgs: ["ktRating"],

		scoreRatingAlgDescriptions: {
			ktRating: "A custom rating system that combines score and the chart level.",
		},
		profileRatingAlgDescriptions: {
			ktRating: "The average of your best 20 ktRatings.",
		},
		sessionRatingAlgDescriptions: {
			ktRating: "The average of your best 10 ktRatings this session.",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["Green", "Yellow", "Red"],
		shortDifficulties: { Green: "G", Yellow: "Y", Red: "R" },
		defaultDifficulty: "Red",
		difficultyColours: {
			Green: COLOUR_SET.green,
			Yellow: COLOUR_SET.vibrantYellow,
			Red: COLOUR_SET.red,
		},

		grades: ["没", "拙", "凡", "佳", "良", "優", "秀", "傑", "傑G"],
		gradeColours: {
			没: COLOUR_SET.gray,
			拙: COLOUR_SET.maroon,
			凡: COLOUR_SET.red,
			佳: COLOUR_SET.paleGreen,
			良: COLOUR_SET.paleBlue,
			優: COLOUR_SET.green,
			秀: COLOUR_SET.blue,
			傑: COLOUR_SET.teal,
			傑G: COLOUR_SET.gold,
		},
		clearGrade: "良",
		gradeBoundaries: [0, 60, 70, 80, 85, 90, 95, 97.5, 100],

		lamps: ["FAILED", "CLEAR", "CONNECT ALL", "PERFECT CONNECT ALL"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.green,
			"CONNECT ALL": COLOUR_SET.teal,
			"PERFECT CONNECT ALL": COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {},

		supportsESD: true,
		judgementWindows: [
			{ name: "CRITICAL", msBorder: 33.333, value: 2 },
			{ name: "NEAR", msBorder: 66.667, value: 1 },
		],
		judgements: ["critical", "near", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["1.5", "1.5-b"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"bms:7K": {
		idString: "bms:7K",
		percentMax: 100,

		defaultScoreRatingAlg: "sieglinde",
		defaultSessionRatingAlg: "sieglinde",
		defaultProfileRatingAlg: "sieglinde",

		scoreRatingAlgs: ["sieglinde"],
		sessionRatingAlgs: ["sieglinde"],
		profileRatingAlgs: ["sieglinde"],

		scoreRatingAlgDescriptions: {
			sieglinde:
				"A clearing algorithm that rewards you points based on how difficult an easy clear or hard clear was.",
		},
		profileRatingAlgDescriptions: {
			sieglinde: "The average of your best 20 sieglinde ratings.",
		},
		sessionRatingAlgDescriptions: {
			sieglinde: "The average of your best 10 sieglinde ratings this session.",
		},

		scoreRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},
		profileRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},
		sessionRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},

		difficulties: ["CHART"],
		shortDifficulties: {}, // not real
		defaultDifficulty: "CHART",
		difficultyColours: {
			CHART: null,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// see iidx:SP for an explaination of why this is wrote like this.
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			genocideDan: BMSGenocideDans,
			stslDan: BMSStSlDans,
			lnDan: BMSLNDans,
			scratchDan: BMSScratchDans,
		},

		supportsESD: false,
		judgements: ["pgreat", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [],

		tierlists: ["sgl-EC", "sgl-HC"],
		tierlistDescriptions: {
			"sgl-EC": "Sieglinde Easy Clear ratings.",
			"sgl-HC": "Sieglinde Hard Clear ratings.",
		},
	},
	"bms:14K": {
		idString: "bms:14K",

		percentMax: 100,

		defaultScoreRatingAlg: "sieglinde",
		defaultSessionRatingAlg: "sieglinde",
		defaultProfileRatingAlg: "sieglinde",

		scoreRatingAlgs: ["sieglinde"],
		sessionRatingAlgs: ["sieglinde"],
		profileRatingAlgs: ["sieglinde"],

		scoreRatingAlgDescriptions: {
			sieglinde:
				"A clearing algorithm that rewards you points based on how difficult an easy clear or hard clear was.",
		},
		profileRatingAlgDescriptions: {
			sieglinde: "The average of your best 20 sieglinde ratings.",
		},
		sessionRatingAlgDescriptions: {
			sieglinde: "The average of your best 10 sieglinde ratings this session.",
		},

		scoreRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},
		profileRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},
		sessionRatingAlgFormatters: {
			sieglinde: FormatSieglindeBMS,
		},

		difficulties: ["CHART"],
		shortDifficulties: {}, // not real
		defaultDifficulty: "CHART",
		difficultyColours: {
			CHART: null,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// see iidx:SP for an explaination of why this is wrote like this.
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			genocideDan: BMSGenocideDans,
		},

		supportsESD: false,
		judgements: ["pgreat", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [],

		tierlists: ["sgl-EC", "sgl-HC"],
		tierlistDescriptions: {
			"sgl-EC": "Sieglinde Easy Clear ratings.",
			"sgl-HC": "Sieglinde Hard Clear ratings.",
		},
	},
	"ddr:SP": {
		idString: "ddr:SP",

		percentMax: 100,

		defaultScoreRatingAlg: "ktRating",
		defaultSessionRatingAlg: "ktRating",
		defaultProfileRatingAlg: "ktRating",

		scoreRatingAlgs: ["MFCP", "ktRating"],
		sessionRatingAlgs: ["MFCP", "ktRating"],
		profileRatingAlgs: ["MFCP", "ktRating"],

		scoreRatingAlgDescriptions: {
			MFCP: "Marvelous Full Combo Points. An algorithm used in LIFE4 that rewards players for getting MFCs.",
			ktRating: "TODO REMOVE ME",
		},
		profileRatingAlgDescriptions: {
			MFCP: "All of your MFC points added together.",
			ktRating: "TODO REMOVE ME",
		},
		sessionRatingAlgDescriptions: {
			MFCP: "All of your MFC points achieved this session added together.",
			ktRating: "TODO REMOVE ME",
		},

		scoreRatingAlgFormatters: {
			MFCP: FormatInt,
		},
		profileRatingAlgFormatters: {
			MFCP: FormatInt,
		},
		sessionRatingAlgFormatters: {
			MFCP: FormatInt,
		},

		difficulties: ["BEGINNER", "BASIC", "DIFFICULT", "EXPERT", "CHALLENGE"],
		shortDifficulties: {
			BEGINNER: "b",
			BASIC: "B",
			DIFFICULT: "D",
			EXPERT: "E",
			CHALLENGE: "C",
		},
		defaultDifficulty: "EXPERT",
		difficultyColours: {
			BEGINNER: COLOUR_SET.paleBlue,
			BASIC: COLOUR_SET.orange,
			DIFFICULT: COLOUR_SET.red,
			EXPERT: COLOUR_SET.green,
			CHALLENGE: COLOUR_SET.purple,
		},

		grades: [
			"D",
			"D+",
			"C-",
			"C",
			"C+",
			"B-",
			"B",
			"B+",
			"A-",
			"A",
			"A+",
			"AA-",
			"AA",
			"AA+",
			"AAA",
		],
		gradeColours: {
			D: COLOUR_SET.gray,
			"D+": COLOUR_SET.maroon,
			"C-": COLOUR_SET.red,
			C: COLOUR_SET.purple,
			"C+": COLOUR_SET.vibrantPurple,
			"B-": COLOUR_SET.paleBlue,
			B: COLOUR_SET.blue,
			"B+": COLOUR_SET.vibrantBlue,
			"A-": COLOUR_SET.paleGreen,
			A: COLOUR_SET.green,
			"A+": COLOUR_SET.vibrantGreen,
			"AA-": COLOUR_SET.paleOrange,
			AA: COLOUR_SET.orange,
			"AA+": COLOUR_SET.vibrantOrange,
			AAA: COLOUR_SET.gold,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 55, 59, 60, 65, 69, 70, 75, 79, 80, 85, 89, 90, 95, 99],

		lamps: [
			"FAILED",
			"CLEAR",
			"LIFE4",
			"FULL COMBO",
			"GREAT FULL COMBO",
			"PERFECT FULL COMBO",
			"MARVELOUS FULL COMBO",
		],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.paleGreen,
			LIFE4: COLOUR_SET.orange,
			"FULL COMBO": COLOUR_SET.paleBlue,
			"GREAT FULL COMBO": COLOUR_SET.green,
			"PERFECT FULL COMBO": COLOUR_SET.gold,
			"MARVELOUS FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: DDRDans,
		},

		supportsESD: true,
		judgementWindows: [
			{ name: "MARVELOUS", msBorder: 15, value: 3 },
			{ name: "PERFECT", msBorder: 30, value: 2 },
			{ name: "GREAT", msBorder: 59, value: 1 },
			{ name: "GOOD", msBorder: 89, value: 0 },
			{ name: "BAD", msBorder: 119, value: 0 },
		],
		judgements: ["marvelous", "perfect", "great", "good", "boo", "miss", "ok", "ng"],

		scoreBucket: "lamp",

		supportedVersions: ["a20"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"ddr:DP": {
		idString: "ddr:DP",

		percentMax: 100,

		defaultScoreRatingAlg: "ktRating",
		defaultSessionRatingAlg: "ktRating",
		defaultProfileRatingAlg: "ktRating",

		scoreRatingAlgs: ["MFCP", "ktRating"],
		sessionRatingAlgs: ["MFCP", "ktRating"],
		profileRatingAlgs: ["MFCP", "ktRating"],

		scoreRatingAlgDescriptions: {
			MFCP: "Marvelous Full Combo Points. An algorithm used in LIFE4 that rewards players for getting MFCs.",
			ktRating: "TODO REMOVE ME",
		},
		profileRatingAlgDescriptions: {
			MFCP: "All of your MFC points added together.",
			ktRating: "TODO REMOVE ME",
		},
		sessionRatingAlgDescriptions: {
			MFCP: "All of your MFC points achieved this session added together.",
			ktRating: "TODO REMOVE ME",
		},

		scoreRatingAlgFormatters: {
			MFCP: FormatInt,
		},
		profileRatingAlgFormatters: {
			MFCP: FormatInt,
		},
		sessionRatingAlgFormatters: {
			MFCP: FormatInt,
		},

		difficulties: ["BASIC", "DIFFICULT", "EXPERT", "CHALLENGE"],
		shortDifficulties: {
			BASIC: "B",
			DIFFICULT: "D",
			EXPERT: "E",
			CHALLENGE: "C",
		},
		defaultDifficulty: "EXPERT",
		difficultyColours: {
			BASIC: COLOUR_SET.orange,
			DIFFICULT: COLOUR_SET.red,
			EXPERT: COLOUR_SET.green,
			CHALLENGE: COLOUR_SET.purple,
		},

		grades: [
			"D",
			"D+",
			"C-",
			"C",
			"C+",
			"B-",
			"B",
			"B+",
			"A-",
			"A",
			"A+",
			"AA-",
			"AA",
			"AA+",
			"AAA",
		],
		gradeColours: {
			D: COLOUR_SET.gray,
			"D+": COLOUR_SET.maroon,
			"C-": COLOUR_SET.red,
			C: COLOUR_SET.purple,
			"C+": COLOUR_SET.vibrantPurple,
			"B-": COLOUR_SET.paleBlue,
			B: COLOUR_SET.blue,
			"B+": COLOUR_SET.vibrantBlue,
			"A-": COLOUR_SET.paleGreen,
			A: COLOUR_SET.green,
			"A+": COLOUR_SET.vibrantGreen,
			"AA-": COLOUR_SET.paleOrange,
			AA: COLOUR_SET.orange,
			"AA+": COLOUR_SET.vibrantOrange,
			AAA: COLOUR_SET.gold,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 55, 59, 60, 65, 69, 70, 75, 79, 80, 85, 89, 90, 95, 99],

		lamps: [
			"FAILED",
			"CLEAR",
			"LIFE4",
			"FULL COMBO",
			"GREAT FULL COMBO",
			"PERFECT FULL COMBO",
			"MARVELOUS FULL COMBO",
		],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.paleGreen,
			LIFE4: COLOUR_SET.orange,
			"FULL COMBO": COLOUR_SET.paleBlue,
			"GREAT FULL COMBO": COLOUR_SET.green,
			"PERFECT FULL COMBO": COLOUR_SET.gold,
			"MARVELOUS FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: DDRDans,
		},

		supportsESD: true,
		judgementWindows: [
			{ name: "MARVELOUS", msBorder: 15, value: 3 },
			{ name: "PERFECT", msBorder: 30, value: 2 },
			{ name: "GREAT", msBorder: 59, value: 1 },
			{ name: "GOOD", msBorder: 89, value: 0 },
			{ name: "BAD", msBorder: 119, value: 0 },
		],
		judgements: ["marvelous", "perfect", "great", "good", "boo", "miss", "ok", "ng"],

		scoreBucket: "lamp",

		supportedVersions: ["a20"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"maimai:Single": {
		idString: "maimai:Single",

		percentMax: Infinity, // doesn't apply to this game -- too difficult to make this field nullable though

		defaultScoreRatingAlg: "ktRating",
		defaultSessionRatingAlg: "ktRating",
		defaultProfileRatingAlg: "ktRating",

		scoreRatingAlgs: ["ktRating"],
		sessionRatingAlgs: ["ktRating"],
		profileRatingAlgs: ["ktRating"],

		scoreRatingAlgDescriptions: {
			ktRating: "TODO REMOVE ME",
		},
		profileRatingAlgDescriptions: {
			ktRating: "TODO REMOVE ME",
		},
		sessionRatingAlgDescriptions: {
			ktRating: "TODO REMOVE ME",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["Easy", "Basic", "Advanced", "Expert", "Master", "Re:Master"],
		shortDifficulties: {
			Easy: "e",
			Basic: "B",
			Advanced: "A",
			Expert: "E",
			Master: "M",
			"Re:Master": "Re",
		},
		defaultDifficulty: "Master",
		difficultyColours: {
			Easy: COLOUR_SET.blue,
			Basic: COLOUR_SET.green,
			Advanced: COLOUR_SET.orange,
			Expert: COLOUR_SET.red,
			Master: COLOUR_SET.purple,
			"Re:Master": COLOUR_SET.white,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "S", "S+", "SS", "SS+", "SSS", "SSS+"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleGreen,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.paleBlue,
			AAA: COLOUR_SET.blue,
			S: COLOUR_SET.gold,
			"S+": COLOUR_SET.vibrantYellow,
			SS: COLOUR_SET.paleOrange,
			"SS+": COLOUR_SET.orange,
			SSS: COLOUR_SET.teal,
			"SSS+": COLOUR_SET.white,
		},
		clearGrade: "A",

		// @hack Maimai's top grade depends on the chart's maximum percent
		// we just set it at percentMax, but it's not technically correct
		gradeBoundaries: [0, 10, 20, 40, 60, 80, 90, 94, 97, 98, 99, 99.5, 100, Infinity],

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "ALL PERFECT", "ALL PERFECT+"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.green,
			"FULL COMBO": COLOUR_SET.blue,
			"ALL PERFECT": COLOUR_SET.gold,
			"ALL PERFECT+": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {},

		supportsESD: false,
		judgements: ["perfect", "great", "good", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["finale"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"gitadora:Gita": {
		idString: "gitadora:Gita",

		percentMax: 100,

		defaultScoreRatingAlg: "skill",
		defaultSessionRatingAlg: "skill",
		defaultProfileRatingAlg: "skill",

		scoreRatingAlgs: ["skill"],
		sessionRatingAlgs: ["skill"],
		profileRatingAlgs: ["skill"],

		scoreRatingAlgDescriptions: {
			skill: "Skill Rating as it's implemented in game.",
		},
		profileRatingAlgDescriptions: {
			skill: "Your profile skill as it's implemented in game -- 25 HOT and 25 not HOT.",
			naiveSkill:
				"Your best 50 skill levels added together, regardless of whether the chart is HOT or not.",
		},
		sessionRatingAlgDescriptions: {
			skill: "The average of your best 10 skill ratings this session.",
		},

		scoreRatingAlgFormatters: {
			skill: FormatInt,
		},
		profileRatingAlgFormatters: {
			skill: FormatInt,
			naiveSkill: FormatInt,
		},
		sessionRatingAlgFormatters: {
			skill: FormatInt,
		},

		difficulties: [
			"BASIC",
			"ADVANCED",
			"EXTREME",
			"MASTER",
			"BASS BASIC",
			"BASS ADVANCED",
			"BASS EXTREME",
			"BASS MASTER",
		],
		shortDifficulties: {
			BASIC: "G-BSC",
			ADVANCED: "G-ADV",
			EXTREME: "G-EXT",
			MASTER: "G-MAS",
			"BASS BASIC": "B-BSC",
			"BASS ADVANCED": "B-ADV",
			"BASS EXTREME": "B-EXT",
			"BASS MASTER": "B-MAS",
		},
		defaultDifficulty: "EXTREME",
		difficultyColours: {
			BASIC: COLOUR_SET.blue,
			ADVANCED: COLOUR_SET.orange,
			EXTREME: COLOUR_SET.red,
			MASTER: COLOUR_SET.purple,
			"BASS BASIC": COLOUR_SET.vibrantBlue,
			"BASS ADVANCED": COLOUR_SET.vibrantOrange,
			"BASS EXTREME": "todo", // colourset vibrant red
			"BASS MASTER": COLOUR_SET.vibrantPurple,
		},

		grades: ["C", "B", "A", "S", "SS", "MAX"],
		gradeColours: {
			C: COLOUR_SET.purple,
			B: COLOUR_SET.blue,
			A: COLOUR_SET.green,
			S: COLOUR_SET.orange,
			SS: COLOUR_SET.gold,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 63, 73, 80, 95, 100],

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "EXCELLENT"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.blue,
			"FULL COMBO": COLOUR_SET.teal,
			EXCELLENT: COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			colour: GitadoraColours,
		},

		supportsESD: false,
		judgements: ["perfect", "great", "good", "ok", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["nextage"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"gitadora:Dora": {
		idString: "gitadora:Dora",

		percentMax: 100,

		defaultScoreRatingAlg: "skill",
		defaultSessionRatingAlg: "skill",
		defaultProfileRatingAlg: "skill",

		scoreRatingAlgs: ["skill"],
		sessionRatingAlgs: ["skill"],
		profileRatingAlgs: ["skill"],

		scoreRatingAlgDescriptions: {
			skill: "Skill Rating as it's implemented in game.",
		},
		profileRatingAlgDescriptions: {
			skill: "Your profile skill as it's implemented in game -- 25 HOT and 25 not HOT.",
			naiveSkill:
				"Your best 50 skill levels added together, regardless of whether the chart is HOT or not.",
		},
		sessionRatingAlgDescriptions: {
			skill: "The average of your best 10 skill ratings this session.",
		},

		scoreRatingAlgFormatters: {
			skill: FormatInt,
		},
		profileRatingAlgFormatters: {
			skill: FormatInt,
			naiveSkill: FormatInt,
		},
		sessionRatingAlgFormatters: {
			skill: FormatInt,
		},

		difficulties: ["BASIC", "ADVANCED", "EXTREME", "MASTER"],
		shortDifficulties: {
			BASIC: "D-BSC",
			ADVANCED: "D-ADV",
			EXTREME: "D-EXT",
			MASTER: "D-MAS",
		},
		defaultDifficulty: "EXTREME",
		difficultyColours: {
			BASIC: COLOUR_SET.blue,
			ADVANCED: COLOUR_SET.orange,
			EXTREME: COLOUR_SET.red,
			MASTER: COLOUR_SET.purple,
		},

		grades: ["C", "B", "A", "S", "SS", "MAX"],
		gradeColours: {
			C: COLOUR_SET.purple,
			B: COLOUR_SET.blue,
			A: COLOUR_SET.green,
			S: COLOUR_SET.orange,
			SS: COLOUR_SET.gold,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",
		gradeBoundaries: [0, 63, 73, 80, 95, 100],

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "EXCELLENT"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.blue,
			"FULL COMBO": COLOUR_SET.teal,
			EXCELLENT: COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			colour: GitadoraColours,
		},

		supportsESD: false,
		judgements: ["perfect", "great", "good", "ok", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["nextage"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"wacca:Single": {
		idString: "wacca:Single",

		percentMax: 100,

		defaultScoreRatingAlg: "rate",
		defaultSessionRatingAlg: "rate",
		defaultProfileRatingAlg: "naiveRate",

		scoreRatingAlgs: ["rate"],
		sessionRatingAlgs: ["rate"],
		profileRatingAlgs: ["naiveRate", "rate"],

		scoreRatingAlgDescriptions: {
			rate: "Rating as it's implemented in game.",
		},
		profileRatingAlgDescriptions: {
			naiveRate: "A naive rating algorithm that just averages your 50 best scores.",
			rate: "Rating as it's implemented in game, taking 15 scores from the latest version and 35 from all old versions.",
		},
		sessionRatingAlgDescriptions: {
			rate: "The average of your best 10 ratings this session.",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["NORMAL", "HARD", "EXPERT", "INFERNO"],
		shortDifficulties: {
			NORMAL: "NRM",
			HARD: "HRD",
			EXPERT: "EXP",
			INFERNO: "INF",
		},
		defaultDifficulty: "EXPERT",
		difficultyColours: {
			NORMAL: COLOUR_SET.blue,
			HARD: COLOUR_SET.gold,
			EXPERT: COLOUR_SET.pink,
			INFERNO: COLOUR_SET.purple,
		},

		grades: ["D", "C", "B", "A", "AA", "AAA", "S", "S+", "SS", "SS+", "SSS", "SSS+", "MASTER"],
		gradeColours: {
			D: COLOUR_SET.gray,
			C: COLOUR_SET.maroon,
			B: COLOUR_SET.red,
			A: COLOUR_SET.paleGreen,
			AA: COLOUR_SET.green,
			AAA: COLOUR_SET.vibrantGreen,
			S: COLOUR_SET.gold,
			"S+": COLOUR_SET.vibrantYellow,
			SS: COLOUR_SET.paleOrange,
			"SS+": COLOUR_SET.orange,
			SSS: COLOUR_SET.pink,
			"SSS+": COLOUR_SET.vibrantPink,
			MASTER: COLOUR_SET.white,
		},
		clearGrade: "S",

		// i'm pretty sure the first grade is below the limit of reliable FPA accuracy
		gradeBoundaries: [0, 0.0001, 3.0001, 70, 80, 85, 90, 93, 95, 97, 98, 99, 100],

		lamps: ["FAILED", "CLEAR", "MISSLESS", "FULL COMBO", "ALL MARVELOUS"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.blue,
			MISSLESS: COLOUR_SET.orange,
			"FULL COMBO": COLOUR_SET.pink,
			"ALL MARVELOUS": COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			stageUp: WaccaStageUps,
			colour: WaccaColours,
		},

		supportsESD: false,
		judgements: ["marvelous", "great", "good", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["reverse"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"popn:9B": {
		idString: "popn:9B",

		percentMax: 100,

		defaultScoreRatingAlg: "classPoints",
		defaultSessionRatingAlg: "classPoints",
		defaultProfileRatingAlg: "naiveClassPoints",

		scoreRatingAlgs: ["classPoints"],
		sessionRatingAlgs: ["classPoints"],
		profileRatingAlgs: ["naiveClassPoints"],

		scoreRatingAlgDescriptions: {
			classPoints: "Class Points as they're implemented in game.",
		},
		profileRatingAlgDescriptions: {
			naiveClassPoints:
				"A naive average of your best 20 scores. This is different to in game class points, as that is affected by recent scores, and not just your best scores.",
		},
		sessionRatingAlgDescriptions: {
			classPoints: "The average of your best 10 class points this session.",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["Easy", "Normal", "Hyper", "EX"],
		shortDifficulties: {
			Easy: "E",
			Normal: "N",
			Hyper: "H",
			EX: "EX",
		},
		defaultDifficulty: "EX",
		difficultyColours: {
			Easy: COLOUR_SET.blue,
			Normal: COLOUR_SET.green,
			Hyper: COLOUR_SET.orange,
			EX: COLOUR_SET.red,
		},

		grades: ["E", "D", "C", "B", "A", "AA", "AAA", "S"],
		gradeColours: {
			E: COLOUR_SET.gray,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.red,
			B: COLOUR_SET.blue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.orange,
			AAA: COLOUR_SET.gold,
			S: COLOUR_SET.teal,
		},
		clearGrade: "A",

		// TECHNICALLY THIS IS NOT CORRECT
		// A Fail is capped at A rank (82%), no matter what!
		gradeBoundaries: [0, 50, 62, 72, 82, 90, 95, 98],

		lamps: ["FAILED", "EASY CLEAR", "CLEAR", "FULL COMBO", "PERFECT"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"FULL COMBO": COLOUR_SET.teal,
			PERFECT: COLOUR_SET.gold,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			class: PopnClasses,
		},

		supportsESD: false,
		judgements: ["cool", "great", "good", "bad"],

		scoreBucket: "lamp",

		supportedVersions: ["peace"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"jubeat:Single": {
		idString: "jubeat:Single",

		percentMax: 120,

		defaultScoreRatingAlg: "jubility",
		defaultSessionRatingAlg: "jubility",
		defaultProfileRatingAlg: "jubility",

		scoreRatingAlgs: ["jubility"],
		sessionRatingAlgs: ["jubility"],
		profileRatingAlgs: ["jubility", "naiveJubility"],

		scoreRatingAlgDescriptions: {
			jubility: "Jubility as it's implemented in game.",
		},
		profileRatingAlgDescriptions: {
			jubility:
				"Your profile jubility. This takes your best 30 scores on PICK UP songs, and your best 30 elsewhere.",
			naiveJubility:
				"A naive version of jubility which just adds together your best 60 scores.",
		},
		sessionRatingAlgDescriptions: {
			jubility: "The average of your best 10 jubilities this session.",
		},

		scoreRatingAlgFormatters: {},
		profileRatingAlgFormatters: {},
		sessionRatingAlgFormatters: {},

		difficulties: ["BSC", "ADV", "EXT", "HARD BSC", "HARD ADV", "HARD EXT"],
		shortDifficulties: {
			BSC: "BSC",
			ADV: "ADV",
			EXT: "EXT",
			"HARD BSC": "H. BSC",
			"HARD ADV": "H. ADV",
			"HARD EXT": "H. EXT",
		},
		defaultDifficulty: "EXT",
		difficultyColours: {
			BSC: COLOUR_SET.green,
			ADV: COLOUR_SET.gold,
			EXT: COLOUR_SET.red,
			"HARD BSC": COLOUR_SET.darkGreen,
			"HARD ADV": COLOUR_SET.orange,
			"HARD EXT": COLOUR_SET.vibrantRed,
		},

		grades: ["E", "D", "C", "B", "A", "S", "SS", "SSS", "EXC"],
		gradeColours: {
			E: COLOUR_SET.gray,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.red,
			B: COLOUR_SET.blue,
			A: COLOUR_SET.green,
			S: COLOUR_SET.gold,
			SS: COLOUR_SET.orange,
			SSS: COLOUR_SET.teal,
			EXC: COLOUR_SET.white,
		},
		clearGrade: "A",
		gradeBoundaries: null,

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "EXCELLENT"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.blue,
			"FULL COMBO": COLOUR_SET.teal,
			EXCELLENT: COLOUR_SET.white,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			colour: JubeatColours,
		},

		supportsESD: false,
		judgements: ["perfect", "great", "good", "poor", "miss"],

		scoreBucket: "grade",

		supportedVersions: ["qubell", "clan", "festo"],

		tierlists: [],
		tierlistDescriptions: {},
	},
	"pms:Controller": {
		idString: "pms:Controller",
		percentMax: 100,

		defaultScoreRatingAlg: "sieglinde",
		defaultSessionRatingAlg: "sieglinde",
		defaultProfileRatingAlg: "sieglinde",

		scoreRatingAlgs: ["sieglinde"],
		sessionRatingAlgs: ["sieglinde"],
		profileRatingAlgs: ["sieglinde"],

		scoreRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},
		profileRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},
		sessionRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},

		scoreRatingAlgDescriptions: {
			sieglinde:
				"A clearing algorithm that rewards you points based on how difficult an easy clear or hard clear was.",
		},
		profileRatingAlgDescriptions: {
			sieglinde: "The average of your best 20 sieglinde ratings.",
		},
		sessionRatingAlgDescriptions: {
			sieglinde: "The average of your best 10 sieglinde ratings this session.",
		},

		difficulties: ["CHART"],
		shortDifficulties: {},
		defaultDifficulty: "CHART",
		difficultyColours: {
			CHART: null,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// see iidx:SP for an explaination of why this is wrote like this.
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: PMSDans,
		},

		supportsESD: false,
		judgements: ["cool", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [],

		tierlists: ["sgl-EC", "sgl-HC"],
		tierlistDescriptions: {
			"sgl-EC": "Sieglinde Easy Clear ratings.",
			"sgl-HC": "Sieglinde Hard Clear ratings.",
		},
	},
	"pms:Keyboard": {
		idString: "pms:Keyboard",
		percentMax: 100,

		defaultScoreRatingAlg: "sieglinde",
		defaultSessionRatingAlg: "sieglinde",
		defaultProfileRatingAlg: "sieglinde",

		scoreRatingAlgs: ["sieglinde"],
		sessionRatingAlgs: ["sieglinde"],
		profileRatingAlgs: ["sieglinde"],

		scoreRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},
		profileRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},
		sessionRatingAlgFormatters: {
			sieglinde: FormatSieglindePMS,
		},

		scoreRatingAlgDescriptions: {
			sieglinde:
				"A clearing algorithm that rewards you points based on how difficult an easy clear or hard clear was.",
		},
		profileRatingAlgDescriptions: {
			sieglinde: "The average of your best 20 sieglinde ratings.",
		},
		sessionRatingAlgDescriptions: {
			sieglinde: "The average of your best 10 sieglinde ratings this session.",
		},

		difficulties: ["CHART"],
		shortDifficulties: {},
		defaultDifficulty: "CHART",
		difficultyColours: {
			CHART: null,
		},

		grades: ["F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX-", "MAX"],
		gradeColours: {
			F: COLOUR_SET.gray,
			E: COLOUR_SET.red,
			D: COLOUR_SET.maroon,
			C: COLOUR_SET.purple,
			B: COLOUR_SET.paleBlue,
			A: COLOUR_SET.green,
			AA: COLOUR_SET.blue,
			AAA: COLOUR_SET.gold,
			"MAX-": COLOUR_SET.teal,
			MAX: COLOUR_SET.white,
		},
		clearGrade: "A",

		// see iidx:SP for an explaination of why this is wrote like this.
		gradeBoundaries: [
			0,
			(100 * 2) / 9,
			(100 * 3) / 9,
			(100 * 4) / 9,
			(100 * 5) / 9,
			(100 * 6) / 9,
			(100 * 7) / 9,
			(100 * 8) / 9,
			(100 * 17) / 18,
			(100 * 9) / 9,
		],

		lamps: [
			"NO PLAY",
			"FAILED",
			"ASSIST CLEAR",
			"EASY CLEAR",
			"CLEAR",
			"HARD CLEAR",
			"EX HARD CLEAR",
			"FULL COMBO",
		],
		lampColours: {
			"NO PLAY": COLOUR_SET.gray,
			FAILED: COLOUR_SET.red,
			"ASSIST CLEAR": COLOUR_SET.purple,
			"EASY CLEAR": COLOUR_SET.green,
			CLEAR: COLOUR_SET.blue,
			"HARD CLEAR": COLOUR_SET.orange,
			"EX HARD CLEAR": COLOUR_SET.gold,
			"FULL COMBO": COLOUR_SET.teal,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {
			dan: PMSDans,
		},

		supportsESD: false,
		judgements: ["cool", "great", "good", "bad", "poor"],

		scoreBucket: "lamp",

		supportedVersions: [],

		tierlists: ["sgl-EC", "sgl-HC"],
		tierlistDescriptions: {
			"sgl-EC": "Sieglinde Easy Clear ratings.",
			"sgl-HC": "Sieglinde Hard Clear ratings.",
		},
	},
	"itg:Stamina": {
		idString: "itg:Stamina",

		percentMax: 100,

		defaultScoreRatingAlg: "blockRating",
		defaultSessionRatingAlg: "blockRating",
		defaultProfileRatingAlg: "highestBlock",

		scoreRatingAlgs: ["blockRating", "highest32", "highest256"],
		sessionRatingAlgs: ["blockRating", "average32Speed"],
		profileRatingAlgs: ["highest32", "highestBlock", "highest256"],

		scoreRatingAlgDescriptions: {
			blockRating: "How much this clear is worth.",
			highest32: "The highest BPM this score streamed 32 measures straight for.",
			highest256: "The highest BPM this score streamed 256 measures straight for.",
		},
		profileRatingAlgDescriptions: {
			highest32: "The highest BPM this user has streamed 32 unbroken measures at.",
			highest256: "The highest BPM this user has streamed 256 unbroken measures at.",
			highestBlock: "The highest block level this player has cleared.",
		},
		sessionRatingAlgDescriptions: {
			blockRating: "An average of your best 5 blsock levels cleared this session.",
			average32Speed: "An average of your fastest 5 32 measure runs this session.",
		},

		// always round these
		scoreRatingAlgFormatters: {
			highest256: (k) => k.toFixed(0),
			highest32: (k) => k.toFixed(0),
			blockRating: (k) => k.toFixed(0),
		},
		profileRatingAlgFormatters: {
			highest256: (k) => k.toFixed(0),
			highest32: (k) => k.toFixed(0),
			highestBlock: (k) => k.toFixed(0),
		},
		sessionRatingAlgFormatters: {},

		// This is quirky (lol)
		// ITG difficulties can be any string they want to be. We just support some
		// hardcoded defaults.
		difficulties: ["Beginner", "Easy", "Medium", "Hard", "Challenge"],
		shortDifficulties: {
			Beginner: "B",
			Easy: "E",
			Medium: "M",
			Hard: "H",
			Challenge: "C",
		},
		defaultDifficulty: "Challenge",
		difficultyColours: {
			Beginner: COLOUR_SET.paleBlue,
			Easy: COLOUR_SET.green,
			Medium: COLOUR_SET.vibrantYellow,
			Hard: COLOUR_SET.red,
			Challenge: COLOUR_SET.pink,
		},

		grades: ["D", "C", "B", "A", "S-", "S", "S+", "★", "★★", "★★★", "★★★★"],
		gradeColours: {
			D: COLOUR_SET.red,
			C: COLOUR_SET.maroon,
			B: COLOUR_SET.purple,
			A: COLOUR_SET.green,
			"S-": COLOUR_SET.paleOrange,
			S: COLOUR_SET.orange,
			"S+": COLOUR_SET.vibrantOrange,
			"★": COLOUR_SET.pink,
			"★★": COLOUR_SET.vibrantPink,
			"★★★": COLOUR_SET.teal,
			"★★★★": COLOUR_SET.white,
		},
		clearGrade: "C",
		gradeBoundaries: [0, 55, 68, 80, 89, 92, 94, 96, 98, 99, 100],

		lamps: ["FAILED", "CLEAR", "FULL COMBO", "FULL EXCELLENT COMBO", "QUAD"],
		lampColours: {
			FAILED: COLOUR_SET.red,
			CLEAR: COLOUR_SET.blue,
			"FULL COMBO": COLOUR_SET.pink,
			"FULL EXCELLENT COMBO": COLOUR_SET.gold,
			QUAD: COLOUR_SET.white,
		},
		clearLamp: "CLEAR",

		classHumanisedFormat: {},

		supportsESD: false,
		judgements: ["fantastic", "excellent", "great", "decent", "wayoff", "miss"],

		scoreBucket: "lamp",

		supportedVersions: [],

		tierlists: [],
		tierlistDescriptions: {},
	},
};

/**
 * Returns the configuration for this game.
 */
export function GetGameConfig<G extends Game>(game: G): GameConfig<G> {
	return GAME_CONFIGS[game] as GameConfig<G>;
}

/**
 * Returns the configuration for this Game + Playtype.
 * Optionally, a generic parameter - IDStrings - can be passed
 * to indicate what IDString this configuration is for.
 */
export function GetGamePTConfig<I extends IDStrings = IDStrings>(
	game: Game,
	playtype: Playtypes[Game]
): GamePTConfig<I> {
	const idString = `${game}:${playtype}` as IDStrings;

	return GAME_PT_CONFIGS[idString] as unknown as GamePTConfig<I>;
}
