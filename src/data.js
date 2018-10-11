export const schema_map = {
    name: 'coord-map',
    areas: [
        {name: "rPZplApex", coords: [63, 358, 68, 407, 55, 409, 41, 396, 37, 382, 32, 368], shape: "poly"},
        {name: "rPZpmApex", coords: [69, 405, 89, 402, 90, 375, 70, 379, 65, 358], shape: "poly"},
        {name: "lPZpmApex", coords: [92, 401, 91, 377, 102, 379, 119, 366, 112, 407], shape: "poly"},
        {name: "lPZplApex", coords: [119, 359, 147, 368, 140, 398, 125, 407, 114, 405], shape: "poly"},
        {name: "lPZaApex", coords: [123, 330, 141, 347, 147, 365, 121, 357, 114, 338, 116, 331], shape: "poly"},
        {
            name: "rPZaApex",
            coords: [56, 331, 69, 333, 65, 344, 64, 357, 33, 367, 40, 343, 47, 337],
            shape: "poly"
        },
        {name: "rTZaApex", coords: [65, 358, 88, 356, 89, 339, 77, 337, 68, 346], shape: "poly"},
        {name: "rTZpApex", coords: [67, 359, 71, 371, 83, 368, 87, 356], shape: "poly"},
        {name: "lTZaApex", coords: [94, 359, 117, 357, 112, 341, 101, 338, 93, 348], shape: "poly"},
        {name: "lTZpApex", coords: [94, 361, 100, 371, 106, 374, 114, 369, 117, 358], shape: "poly"},
        {name: "rASApex", coords: [67, 325, 92, 323, 91, 337, 78, 335, 70, 339], shape: "poly"},
        {name: "lASApex", coords: [94, 323, 119, 329, 113, 331, 112, 337, 102, 335, 94, 336], shape: "poly"},

        {name: "rPZplMid", coords: [39, 218, 48, 271, 25, 252, 19, 228], shape: "poly"},
        {name: "lPZplMid", coords: [162, 227, 155, 258, 133, 270, 145, 218], shape: "poly"},
        {name: "rPZpmMid", coords: [50, 271, 89, 275, 90, 234, 79, 242, 57, 245, 44, 236], shape: "poly"},
        {name: "lPZpmMid", coords: [139, 242, 130, 272, 92, 279, 92, 238, 105, 245, 123, 249], shape: "poly"},
        {name: "rTZpMid", coords: [88, 218, 41, 218, 44, 234, 57, 244, 77, 242, 86, 231], shape: "poly"},
        {name: "lTZpMid", coords: [141, 218, 92, 220, 102, 237, 121, 248, 137, 239], shape: "poly"},
        {name: "rPZaMid", coords: [55, 188, 43, 202, 38, 216, 18, 226, 27, 204, 47, 185], shape: "poly"},
        {
            name: "lPZaMid",
            coords: [130, 180, 125, 190, 140, 200, 140, 220, 160, 230, 158, 210, 150, 200],
            shape: "poly"
        },
        {name: "rTZaMid", coords: [88, 215, 86, 194, 75, 183, 54, 191, 44, 205, 40, 216], shape: "poly"},
        {name: "lTZaMid", coords: [93, 217, 97, 190, 112, 184, 130, 192, 140, 207, 140, 216], shape: "poly"},
        {
            name: "rASMid",
            coords: [51, 181, 78, 172, 89, 170, 90, 215, 85, 189, 75, 180, 57, 187],
            shape: "poly"
        },
        {
            name: "lASMid",
            coords: [128, 180, 110, 170, 91, 169, 91, 216, 99, 188, 112, 182, 127, 189],
            shape: "poly"
        },

        {name: "rCZBase", coords: [36, 81, 44, 110, 62, 125, 90, 128, 89, 90, 50, 91], shape: "poly"},
        {name: "lCZBase", coords: [92, 91, 94, 128, 118, 129, 138, 109, 145, 80, 132, 90], shape: "poly"},
        {name: "lPZplBase", coords: [150, 74, 173, 84, 170, 109, 138, 124], shape: "poly"},
        {name: "rPZplBase", coords: [9, 80, 7, 100, 19, 116, 41, 124, 33, 75], shape: "poly"},
        {name: "rPZaBase", coords: [33, 74, 26, 50, 14, 56, 8, 79], shape: "poly"},
        {name: "lPZaBase", coords: [151, 73, 159, 51, 167, 55, 175, 83], shape: "poly"},
        {name: "rTZpBase", coords: [36, 74, 89, 74, 90, 89, 48, 90], shape: "poly"},
        {name: "lTZpBase", coords: [94, 75, 145, 73, 130, 88, 93, 89], shape: "poly"},
        {name: "rTZaBase", coords: [34, 72, 36, 43, 70, 32, 86, 51, 86, 72], shape: "poly"},
        {name: "lTZaBase", coords: [93, 71, 102, 40, 122, 32, 144, 44, 150, 64, 145, 70], shape: "poly"},
        {name: "rASBase", coords: [22, 43, 56, 24, 89, 22, 87, 48, 71, 28, 33, 43, 34, 65], shape: "poly"},
        {
            name: 'lASBase',
            coords: [162, 45, 139, 26, 112, 18, 94, 19, 95, 48, 106, 34, 121, 29, 146, 42, 152, 58],
            shape: "poly"
        },

    ]
};
export const lexicon = {
    total: [
        '',
        'very low (clinically significant cancer is highly unlikely to be present)',
        'low (clinically significant cancer is unlikely to be present',
        'intermediate (the presence of clinically significant cancer is equivocal)',
        'high (clinically significant cancer is likely to be present)',
        'very high (clinically significant cancer is highly likely to be present)',
    ],
    t2w_pz: [
        '',
        'uniform hyperintense signal intensity (normal)',
        'linear or wedge-shaped hypointensity or diffuse mild hypointensity, usually indistinct margin',
        'heterogeneous signal intensity or non-circumscribed, rounded, moderate hypointensity (includes others that do not qualify as 2, 4, or 5)',
        'circumscribed, homogenous moderate hypointensefocus/mass confined to prostate and <1.5 cm in greatest dimension',
        'same as 4 but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
    ],
    t2w_tz: [
        '',
        'homogeneous intermediate signal intensity (normal)',
        'circumscribed hypointense or heterogeneous encapsulated nodule(s) (BPH)',
        'heterogeneous signal intensity with obscured margins (includes others that do not qualify as 2, 4, or 5)',
        'lenticular or non-circumscribed, homogeneous, moderately hypointense, and <1.5 cm in greatest dimension',
        'same as 4, but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
    ],
    dwi: [
        '',
        'no abnormality (i.e., normal) on ADC and high b-value DWI',
        'indistinct hypointense on ADC',
        'focal mildly/moderately hypointense on ADC and isointense/mildly hyperintense on high b-valueDWI.',
        'focal markedly hypointense on ADC and markedly hyperintense on high b-value DWI; <1.5cm in greatest dimension',
        'same as 4 but ≥1.5cm in greatest dimension or definite extraprostatic extension/invasive behavior',
    ],
    dce: [
        '',
        'no early enhancement, or diffuse enhancement not corresponding to a focal finding on T2W and/or DWI or focal enhancement corresponding to a lesion demonstrating features of BPH on T2WI',
        'focal, and; earlier than or contemporaneously with enhancement of adjacent normal prostatic tissues, and; correspnds to suspicious finding on T2W and/or DWI',
    ]
};
