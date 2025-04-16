import { GameToday } from "../Game";

export const activegame: GameToday = {
  id: 778288,
  feed: "https://statsapi.mlb.com/api/v1.1/game/778288/feed/live",
  content: "https://statsapi.mlb.com/api/v1/game/778288/content",
  status: "In Progress",
  away: {
    record: { wins: 12, losses: 8, pct: ".600" },
    name: "Chicago Cubs",
    id: 112,
    startingPitcher: {
      fullName: "Matthew Boyd",
      id: 571510,
      avatar: "https://midfield.mlbstatic.com/v1/people/571510/spots/120",
    },
    score: { runs: 2, hits: 6, errors: 1, leftOnBase: 3 },
    abbreviation: "CHC",
    logo: "https://firebasestorage.googleapis.com/v0/b/mario-luevanos.appspot.com/o/mlb%2FChicago%20Cubs.svg?alt=media&token=d87f00a6-1185-41bd-af46-636105521b3d",
  },
  home: {
    record: { wins: 14, losses: 4, pct: ".778" },
    name: "San Diego Padres",
    id: 135,
    startingPitcher: {
      fullName: "Nick Pivetta",
      id: 601713,
      avatar: "https://midfield.mlbstatic.com/v1/people/601713/spots/120",
    },
    score: { runs: 3, hits: 7, errors: 0, leftOnBase: 7 },
    abbreviation: "SD",
    logo: "https://firebasestorage.googleapis.com/v0/b/mario-luevanos.appspot.com/o/mlb%2FSan%20Diego%20Padres.svg?alt=media&token=e7d7eda3-0d5b-49fb-a65c-1f646d635ef3",
  },
  time: "1:10 PM",
  innings: [
    {
      num: 1,
      ordinalNum: "1st",
      home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      away: { runs: 0, hits: 1, errors: 0, leftOnBase: 1 },
    },
    {
      num: 2,
      ordinalNum: "2nd",
      home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
    },
    {
      num: 3,
      ordinalNum: "3rd",
      home: { runs: 2, hits: 3, errors: 0, leftOnBase: 1 },
      away: { runs: 1, hits: 2, errors: 0, leftOnBase: 1 },
    },
    {
      num: 4,
      ordinalNum: "4th",
      home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
    },
    {
      num: 5,
      ordinalNum: "5th",
      home: { runs: 0, hits: 2, errors: 0, leftOnBase: 3 },
      away: { runs: 0, hits: 0, errors: 1, leftOnBase: 0 },
    },
    {
      num: 6,
      ordinalNum: "6th",
      home: { runs: 0, hits: 1, errors: 0, leftOnBase: 2 },
      away: { runs: 0, hits: 1, errors: 0, leftOnBase: 0 },
    },
    {
      num: 7,
      ordinalNum: "7th",
      home: { runs: 1, hits: 1, errors: 0, leftOnBase: 1 },
      away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
    },
    {
      num: 8,
      ordinalNum: "8th",
      home: { hits: 0, errors: 0, leftOnBase: 0 },
      away: { runs: 1, hits: 2, errors: 0, leftOnBase: 1 },
    },
  ],
  currentInning: "BOT 8th",
  topPerformers: [
    {
      avatar: "https://midfield.mlbstatic.com/v1/people/601713/spots/120",
      jerseyNumber: "27",
      id: 601713,
      fullName: "Nick Pivetta",
      pos: "P",
      summary: "6.0 IP, ER, 6 K, BB",
    },
    {
      avatar: "https://midfield.mlbstatic.com/v1/people/642180/spots/120",
      jerseyNumber: "14",
      id: 642180,
      fullName: "Tyler Wade",
      pos: "CF",
      summary: "2-2 | BB, 2 R",
    },
    {
      avatar: "https://midfield.mlbstatic.com/v1/people/571510/spots/120",
      jerseyNumber: "16",
      id: 571510,
      fullName: "Matthew Boyd",
      pos: "P",
      summary: "5.1 IP, 2 ER, 3 K, 2 BB",
    },
  ],
  highlights: [
    {
      type: "video",
      title: "Manny Machado's RBI single",
      description:
        "Manny Machado lines an RBI single to left field to give the Padres a 2-1 lead in the 3rd",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/clnqpmijy8oysmfmz4vx.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/clnqpmijy8oysmfmz4vx.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/0f04615f-791fc956-58f47be6-csvm-diamondgcp-asset-4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Matthew Boyd strikes out Connor Joe",
      description:
        "Matthew Boyd strikes out Connor Joe in the bottom of the 3rd",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/ekjvbnh4wxvpp3qv7sed.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/ekjvbnh4wxvpp3qv7sed.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/640b1574-b04f8633-1f8f5215-csvm-diamondgcp-asset-4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Daniel Palencia In play, out(s) to Elias Díaz",
      description: "CHC vs. SD at Petco Park",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/qm6nmenovteolsxr6n3k.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/qm6nmenovteolsxr6n3k.jpg",
        },
      },
      video: {
        url: "https://bdata-producedclips.mlb.com/35a8eb13-d1bd-4a7f-b418-0370aa13b3ea.mp4",
      },
    },
    {
      type: "video",
      title: "Elias Díaz nabs Ian Happ after review",
      description:
        "Elias Díaz throws out Ian Happ at second after the original call is upheld following a review in the top of the 6th",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/bk0snswxtvemupilell7.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/bk0snswxtvemupilell7.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/ef4dd8dd-677a0791-5c7ee975-csvm-diamondgcp-asset_1280x720_59_4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Nick Pivetta strikes out the side in the 5th",
      description:
        "Nick Pivetta strikes out Pete Crow-Armstrong, Carson Kelly and Jon Berti in the top of the 5th",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/tb0z3ejvikazyetbw1r9.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/tb0z3ejvikazyetbw1r9.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/53ecd701-e42bd374-ff4621f4-csvm-diamondgcp-asset_1280x720_59_4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Nico Hoerner gets creative trying to throw to first",
      description:
        "Nico Hoerner attempts to throw out Tyler Wade at first by tossing the ball between his legs after making a barehanded grab",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/xlmctr5o9a4do2qpucb0.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/xlmctr5o9a4do2qpucb0.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/6be22223-50c88d3b-faa75598-csvm-diamondgcp-asset_1280x720_59_4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Fernando Tatis Jr.'s RBI infield single",
      description:
        "Fernando Tatis Jr. legs out an infield single to bring home a run and tie the game at 1 in the bottom of the 3rd",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/uuzsla4wbrnbf6dba3ve.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/uuzsla4wbrnbf6dba3ve.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/89c2303b-f4c1054e-7d7b4b19-csvm-diamondgcp-asset_1280x720_59_4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Kyle Tucker's sac fly",
      description:
        "Kyle Tucker lifts a sacrifice fly to left field to give the Cubs a 1-0 lead in the top of the 3rd",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/oa6qzyupyldemwvcy7sp.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/oa6qzyupyldemwvcy7sp.jpg",
        },
      },
      video: {
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-04/16/ace9b875-51d33290-b2a6d9f0-csvm-diamondgcp-asset-4000K.mp4",
      },
    },
    {
      type: "video",
      title: "Breaking down Matthew Boyd's pitches",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/g7z8a4ceafjqimqetezb.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/g7z8a4ceafjqimqetezb.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/9383c5ed-b05b-4263-b5d3-4d175db82355.mp4",
      },
    },
    {
      type: "video",
      title: "Breaking down Nick Pivetta's pitches",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/pearymunpepld1oao0ly.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/pearymunpepld1oao0ly.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/eb37c4ca-a06d-433c-9772-f80e6a7820b5.mp4",
      },
    },
    {
      type: "video",
      title: "Nick Pivetta's outing against the Cubs",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/w6xlahhsfwzm0cbopnmi.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/w6xlahhsfwzm0cbopnmi.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/5683ca37-f57d-4627-aa80-f9a22f937c62.mp4",
      },
    },
    {
      type: "video",
      title: "Matthew Boyd's outing against the Padres",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/dcge3jobkzihzr336wfd.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/dcge3jobkzihzr336wfd.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/8ec332a0-6011-4d0c-8a1a-6c40fbd4be20.mp4",
      },
    },
    {
      type: "video",
      title: "Starting lineups for Cubs at Padres - April 16, 2025",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/y7sgprlzkzmbcpgak1jm.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/y7sgprlzkzmbcpgak1jm.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/0b8bfbc9-e03e-46b9-b834-d9da562b1cfc.mp4",
      },
    },
    {
      type: "video",
      title: "Fielding alignment for Chicago, April 16 vs Padres",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/ixhcgj3co58mdrswkmyg.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/ixhcgj3co58mdrswkmyg.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/342e8a9c-c64d-4b2b-bad2-17b7baa118e2.mp4",
      },
    },
    {
      type: "video",
      title: "Bench availability for Chicago, April 16 vs Padres",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/skabdjphvkfhmp5xuznx.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/skabdjphvkfhmp5xuznx.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/23f95bb4-af84-4dcb-955c-372717ae0860.mp4",
      },
    },
    {
      type: "video",
      title: "Fielding alignment for San Diego, April 16 vs Cubs",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/i99nvjvxto5vkszizmk9.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/i99nvjvxto5vkszizmk9.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/b3a9e7fb-4439-4342-812f-4baced0e6163.mp4",
      },
    },
    {
      type: "video",
      title: "Bench availability for San Diego, April 16 vs Cubs",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/pxlif7f4ounfe25fvfj8.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/pxlif7f4ounfe25fvfj8.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/229dd469-f9a1-4df9-8991-b3e43f04140a.mp4",
      },
    },
    {
      type: "video",
      title: "Bullpen availability for Chicago, April 16 vs Padres",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/eqpg9ax3ralupjr8pvsf.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/eqpg9ax3ralupjr8pvsf.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/ef355f6e-39b6-4bc9-9445-48cb65fee300.mp4",
      },
    },
    {
      type: "video",
      title: "Bullpen availability for San Diego, April 16 vs Cubs",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/bgc9vz2aywxbtoxiv0rv.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/bgc9vz2aywxbtoxiv0rv.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/1472b129-bc7e-4988-8f19-210b2000f054.mp4",
      },
    },
    {
      type: "video",
      title: "Probable pitchers for Cubs at Padres - April 16, 2025",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/tovmzzmlkn2iewcco6ay.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/tovmzzmlkn2iewcco6ay.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/0866b815-d131-4497-9c54-4dedc92ca74a.mp4",
      },
    },
    {
      type: "video",
      title: "Probable pitchers for Cubs at Padres - April 16, 2025",
      placeholder: {
        sm: {
          width: 320,
          height: 180,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_320,h_180,f_jpg,c_fill,g_auto/mlb/zbt2bcvutswgzrk8d02i.jpg",
        },
        lg: {
          width: 1280,
          height: 720,
          src: "https://img.mlbstatic.com/mlb-images/image/upload/w_1280,h_720,f_jpg,c_fill,g_auto/mlb/zbt2bcvutswgzrk8d02i.jpg",
        },
      },
      video: {
        url: "https://darkroom-clips.mlb.com/ea7c8546-2270-44c1-9878-c59c0637430e.mp4",
      },
    },
  ],
  streams: [
    {
      name: "Link 1HD",
      url: "https://mlbbox.me/san-diego-padres-vs-chicago-cubs-live/mlb/stream-1",
    },
    {
      name: "Link 2HD",
      url: "https://mlbbox.me/san-diego-padres-vs-chicago-cubs-live/mlb/stream-2",
    },
    {
      name: "Link 3",
      url: "https://mlbbox.me/san-diego-padres-vs-chicago-cubs-live/mlb/stream-3",
    },
    {
      name: "Link 4",
      url: "https://mlbbox.me/san-diego-padres-vs-chicago-cubs-live/mlb/stream-4",
    },
  ],
  currentPlay: {
    count: { balls: 2, strikes: 2, outs: 2 },
    runners: {
      second: {
        id: 518792,
        fullName: "Jason Heyward",
        avatar: "",
      },
      first: {
        id: 657757,
        fullName: "Gavin Sheets",
        avatar: "",
      },
    },
    matchup: {
      batter: {
        id: 553869,
        fullName: "Elias Díaz",
        avatar: "https://midfield.mlbstatic.com/v1/people/553869/spots/120",
        bats: "R",
        summary: "0-2 | BB, R",
      },
      pitcher: {
        id: 681432,
        fullName: "Luke Little",
        avatar: "https://midfield.mlbstatic.com/v1/people/681432/spots/120",
        throws: "L",
        summary: "0.1 IP, 0 ER, 0 K, BB",
      },
    },
  },
};
