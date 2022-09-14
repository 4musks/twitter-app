import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useMergeState } from "../../utils/custom-hooks";
import { TWITTER_APP_TOKEN } from "../../utils/config";
import { getTweets } from "../../api";

export default function DashboardContainer() {
  const [state, setState] = useMergeState({
    tweets: [
      {
        id: "1537073685445586945",
        text: "@FounderEric I am!\n\nhttps://t.co/hnP8m9qT1s",
      },
      {
        id: "1513068616052142083",
        text: "@sabrinaesaquino And sunday too!",
      },
      {
        id: "1504847873040478211",
        text: "@DawsonCodes npm i",
      },
      {
        id: "1500075393235050497",
        text: "Savage! https://t.co/yOovM2xzyv",
      },
      {
        id: "1479844946614140929",
        text: "RT @nihal_was_here: Build for the people and build something that people want.",
      },
      {
        id: "1479814027786301441",
        text: 'RT @nihal_was_here: "It is during our darkest moments that we must focus to see the light." -Aristotle',
      },
      {
        id: "1479784555125133314",
        text: "RT @nihal_was_here: A goal can never be achieved until you take actions...",
      },
      {
        id: "1479752332661469185",
        text: "RT @nihal_was_here: “If you are not willing to own a stock ten years, do not even think about it owning it for ten minutes.” - Warren Buffe…",
      },
      {
        id: "1444295046912610314",
        text: "RT @nodejs: Are you currently hiring for a role that includes using Node.js? Reply with a link to the opening and any relevant context.\n\nIf…",
      },
      {
        id: "1438188850770165761",
        text: "@BuildingWaves @Making_Waves Voted!",
      },
      {
        id: "1438188825663000579",
        text: "RT @BuildingWaves: My little startup (@Making_Waves) reached the finals of my uni's startup competition!!\nIt's a public vote and the prize…",
      },
      {
        id: "1437711795028840451",
        text: 'RT @SimonHoiberg: 🔥 Functional Style JavaScript 🔥\n\nThe most popular and widely accepted style of writing JavaScript in 2021.\n\nBut what is "…',
      },
      {
        id: "1420288785825239041",
        text: "@ShrutiAg99 😂",
      },
      {
        id: "1418827648332042241",
        text: "@zajc_ania I am a programmer since the past 3 years, I recently started playing Flute as a hobby!!!",
      },
    ],
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleCreateTweet = () => {
    if (!state.tweet) {
      return;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TWITTER_APP_TOKEN);
    window.location.href = "/login";
  };

  useEffect(() => {
    const asyncHandler = async () => {
      try {
        // await getTweets();
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <div className="flex justify-end">
          <div className="underline cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>

        <div className="mt-10">
          <div>
            <TextField
              fullWidth
              name="tweet"
              placeholder="What's happening?"
              multiline
              minRows={4}
              value={state.tweet}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end mt-4">
            <div
              className="flex justify-center items-center w-20 tweet-btn font-semibold text-white rounded-full h-8 cursor-pointer hover:opacity-80"
              onClick={handleCreateTweet}
            >
              Tweet
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="text-xl font-semibold">My recent tweets</div>

          {state?.tweets.map((tweet) => (
            <div
              key={tweet?._id}
              className="card h-24 min-h-full p-4 my-4 flex justify-start items-center"
            >
              <div className="">{tweet?.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
