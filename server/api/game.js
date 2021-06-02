const express = require("express");
const router = express.Router();

const idFilter = (req) => (member) => member.id === parseInt(req.params.id);

const games = [];

// Get all game data
router.get("/", (req, res) => res.json(games));

// Create new game
router.post("/", (req, res) => {
  newGameId = makeId(5);

  const newGame = {
    id: newGameId,
    ip1: req.ip,
    ip2: null,
    history: [{ squares: Array(9).fill(null) }],
    moveNum: 0,
  };

  games.push(newGame);
  res.send(games);
});

// Update state of game
router.put("/:id", (req, res) => {
  res.send(games);
});

// router.get("/:id", (req, res) => {
//   res.send("get");
// });

router.get("/binaya", (req, res) => {
  res.send("<h1>Hi binaya</h1>  <p>I just wanted to say hi</p>");
});

// Make unique ID for game
function makeId(length) {
  const result = [];
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  let id = result.join("");

  // Check that ID is unique
  if (games.find((game) => game.id === id)) {
    id = makeId(length);
  }

  return id;
}

//   if (!newMember.name || !newMember.email) {
//     return res.status(400).json({ msg: "Please include a name and email" });
//   }

//   members.push(newMember);
//   res.json(members);
//   // res.redirect('/');
// });

// router.get("/:id", (req, res) => {
//   const found = members.some(idFilter(req));

//   if (found) {
//     res.json(members.filter(idFilter(req)));
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

// // Update Member
// router.put("/:id", (req, res) => {
//   const found = members.some(idFilter(req));

//   if (found) {
//     members.forEach((member, i) => {
//       if (idFilter(req)(member)) {
//         const updMember = { ...member, ...req.body };
//         members[i] = updMember;
//         res.json({ msg: "Member updated", updMember });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

// // Delete Member
// router.delete("/:id", (req, res) => {
//   const found = members.some(idFilter(req));

//   if (found) {
//     res.json({
//       msg: "Member deleted",
//       members: members.filter((member) => !idFilter(req)(member)),
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

module.exports = router;
