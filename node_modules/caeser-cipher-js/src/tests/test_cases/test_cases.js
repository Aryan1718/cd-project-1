export const encryption_tests = {
    test1: {
        text: "Meet me at five o clock in the back",
        shift: 8,
        result: { msg: 'UMMB UM IB NQDM W KTWKS QV BPM JIKS', shift: 8 }
    },
    test2: {
        text: "I live at 341 Holmes Street",
        shift: "-3, -5, -2",
        result: { msg: 'F GGSZ YQ DEB CMIHCP NROZCQ', numIndexes: [ 10, 11, 12 ], shifts: [ -3, -5, -2 ] }
    },
    test3: {
        text: "Don't Trust Him At All!",
        shift: -13,
        result: { msg: "QBA'G GEHFG UVZ NG NYY!", shift: -13 }
    },
    random: {
        singleShift: {
            text: "Meet me at five o clock in the back"
        },
        multiShift: {
            text: "Meet me at five o clock in the back",
            length: 5
        }
    },
    manyTexts1: {
        texts: ["Meet me at five o clock in the back", "I live at 341 Holmes Street", "Don't Trust Him At All!"],
        shifts: 7,
        result: [
            { msg: 'TLLA TL HA MPCL V JSVJR PU AOL IHJR', shift: 7, msgID: 1 },
            {
              msg: 'P SPCL HA DEB OVSTLZ ZAYLLA',
              numIndexes: [ 10, 11, 12 ],
              shift: 7,
              msgID: 2
            },
            { msg: "KVU'A AYBZA OPT HA HSS!", shift: 7, msgID: 3 }
        ]
    },
    manyTexts2: {
        texts: ["Meet me at five o clock in the back", "I live at 341 Holmes Street", "Don't Trust Him At All!"],
        shifts: [5, 2, 8],
        result: [
            { msg: 'RJJY RJ FY KNAJ T HQTHP NS YMJ GFHP', shift: 5, msgID: 1 },
            {
              msg: 'K NKXG CV DEB JQNOGU UVTGGV',
              numIndexes: [ 10, 11, 12 ],
              shift: 2,
              msgID: 2
            },
            { msg: "LWV'B BZCAB PQU IB ITT!", shift: 8, msgID: 3 }
        ]
    },
    manyTexts3: {
        texts: ["Meet me at five o clock in the back", "I live at 341 Holmes Street", "Don't Trust Him At All!"],
        shifts: ['RANDOM', 'RANDOM', 'RANDOM']
    }
};

export const decryption_tests = {
    test1: {
        text: "L OLYH DW DEB RDN VWUHHW",
        shift: -3,
        indexes: [10, 11, 12],
        result: { msg: 'I LIVE AT 341 OAK STREET', shift: -3 }
    },
    test2: {
        text: "JV XAAOBPP KRJYBO ZEXKDBA COLJ EDC QL EDE",
        shift: 3,
        indexes: [31, 32, 33, 38, 39, 40],
        result: { msg: 'MY ADDRESS NUMBER CHANGED FROM 432 TO 434', shift: 3 }
    },
    test3: {
        text: 'RFC AMBC GQ DEEB. BMLR QFYPC GR UGRF YLWMLC',
        shift: 2,
        indexes: [12, 13, 14, 15],
        result: { msg: 'THE CODE IS 3441. DONT SHARE IT WITH ANYONE', shift: 2 }
    },
    test4: {
        text: "RD XJHZWJ RJXXFLJ",
        shift: "BRUTE FORCE",
        result: [
            { msg: 'RD XJHZWJ RJXXFLJ', shift: 0 },
            { msg: 'SE YKIAXK SKYYGMK', shift: 1 },
            { msg: 'TF ZLJBYL TLZZHNL', shift: 2 },
            { msg: 'UG AMKCZM UMAAIOM', shift: 3 },
            { msg: 'VH BNLDAN VNBBJPN', shift: 4 },
            { msg: 'WI COMEBO WOCCKQO', shift: 5 },
            { msg: 'XJ DPNFCP XPDDLRP', shift: 6 },
            { msg: 'YK EQOGDQ YQEEMSQ', shift: 7 },
            { msg: 'ZL FRPHER ZRFFNTR', shift: 8 },
            { msg: 'AM GSQIFS ASGGOUS', shift: 9 },
            { msg: 'BN HTRJGT BTHHPVT', shift: 10 },
            { msg: 'CO IUSKHU CUIIQWU', shift: 11 },
            { msg: 'DP JVTLIV DVJJRXV', shift: 12 },
            { msg: 'EQ KWUMJW EWKKSYW', shift: 13 },
            { msg: 'FR LXVNKX FXLLTZX', shift: 14 },
            { msg: 'GS MYWOLY GYMMUAY', shift: 15 },
            { msg: 'HT NZXPMZ HZNNVBZ', shift: 16 },
            { msg: 'IU OAYQNA IAOOWCA', shift: 17 },
            { msg: 'JV PBZROB JBPPXDB', shift: 18 },
            { msg: 'KW QCASPC KCQQYEC', shift: 19 },
            { msg: 'LX RDBTQD LDRRZFD', shift: 20 },
            { msg: 'MY SECURE MESSAGE', shift: 21 },
            { msg: 'NZ TFDVSF NFTTBHF', shift: 22 },
            { msg: 'OA UGEWTG OGUUCIG', shift: 23 },
            { msg: 'PB VHFXUH PHVVDJH', shift: 24 },
            { msg: 'QC WIGYVI QIWWEKI', shift: 25 }
          ]
    },
    manyTexts1: {
        texts: ["TLLA TL HA MPCL V JSVJR PU AOL IHJR", "P SPCL HA DEB OVSTLZ ZAYLLA", "KVUA AYBZA OPT HA HSS!"],
        shifts: -7,
        numIndexes: [[], [ 10, 11, 12 ], []],
        result: [
            { msg: 'MEET ME AT FIVE O CLOCK IN THE BACK', shift: -7, msgID: 1 },
            { msg: 'I LIVE AT 341 HOLMES STREET', shift: -7, msgID: 2 },
            { msg: 'DONT TRUST HIM AT ALL!', shift: -7, msgID: 3 }
          ]
    },
    manyTexts2: {
        texts: ["RJJY RJ FY KNAJ T HQTHP NS YMJ GFHP", "K NKXG CV DEB JQNOGU UVTGGV", "LWVB BZCAB PQU IB ITT!"],
        shifts: [-5, -2, -8],
        numIndexes: [[], [10, 11, 12], []],
        result: [
            { msg: 'MEET ME AT FIVE O CLOCK IN THE BACK', shift: -5, msgID: 1 },
            { msg: 'I LIVE AT 341 HOLMES STREET', shift: -2, msgID: 2 },
            { msg: 'DONT TRUST HIM AT ALL!', shift: -8, msgID: 3 }
          ]
    },
}