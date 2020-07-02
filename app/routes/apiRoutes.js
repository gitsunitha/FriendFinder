// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var questions = require("../data/questions");
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.get("/api/questions", function(req, res) {
        res.json(questions);
    });

    app.post("/api/matchfriend", function(req, res) {
        // Calculate the difference between response submitted to the response for each
        // sort the array results
        // get the top name as match

        let matchCount = 0; // this is the sum of all the differences
        let finalMatch = {};

        let finderName = req.body.name;
        let finderPic = req.body.image;
        let finderScores = req.body.scores;
        //scores is an array and needs to be converted to int

        let finderScoresInt = finderScores.map(function(score) {
            return parseInt(score);
        });

        //sum the scores ...sum of difference of individual scores = diff of sum of scores
        let sumFinderScores = finderScoresInt.reduce(function(
                totalValue,
                currentValue
            ) {
                return totalValue + currentValue;
            },
            0);
        console.log(`The finders score is ${sumFinderScores}`);

        //now compare it to every one of the elements in the firends array
        let bestMatchDiff = 50; //this is the max diff possible.
        //Anything lower than the current bestMatchDiff is better and should update this value
        let matchedFriend = friends[0]; //start from the first
        let diffScores = 0;

        friends.forEach((person) => {
            console.log(`Checking ${person.name}`);
            let currentMatchScore = person.scores.reduce(function(
                    totalValue,
                    currentValue
                ) {
                    return totalValue + currentValue;
                },
                0);
            diffScores = Math.abs(currentMatchScore - sumFinderScores);
            if (diffScores < bestMatchDiff) {
                bestMatchDiff = diffScores;
                matchedFriend = person;
                console.log(
                    `Found a better match: ${sumFinderScores} : ${diffScores} : ${currentMatchScore} : ${bestMatchDiff} : ${person.name}`
                );
            }
        });

        let returnJson = {
            name: matchedFriend.name,
            image: matchedFriend.image,
            difference: bestMatchDiff,
        };
        friends.push({
            name: finderName,
            image: finderPic,
            scores: finderScores,
        });
        console.log(`Added to DB: total people is now ${friends.length}`);
        res.json(returnJson);
    });
};