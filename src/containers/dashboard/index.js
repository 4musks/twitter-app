import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMergeState } from "../../utils/custom-hooks";
import { TWITTER_APP_TOKEN } from "../../utils/config";
import { createTweet, deleteTweet, getTweet } from "../../api";

export default function DashboardContainer() {
  const [state, setState] = useMergeState({
    tweet: {},
    newTweet: "",
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleCreateTweet = async () => {
    if (!state.newTweet) {
      return;
    }

    await createTweet({ text: state.newTweet });
  };

  const handleDeleteTweet = async () => {
    await deleteTweet({ id: state?.tweet?.id });
  };

  const handleLogout = () => {
    localStorage.removeItem(TWITTER_APP_TOKEN);
    window.location.href = "/login";
  };

  useEffect(() => {
    const asyncHandler = async () => {
      try {
        const response = await getTweet({ id: "" });
        setState({ tweet: response });
      } catch (error) {
        console.error(error);
      }
    };

    asyncHandler();
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
              name="newTweet"
              placeholder="What's happening?"
              multiline
              minRows={4}
              value={state.newTweet}
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
          <div className="text-xl font-semibold">My recently added tweet</div>

          {state?.tweet?.id && (
            <div className="card h-24 min-h-full p-4 my-4 flex justify-between items-center">
              <div>{state?.tweet?.text}</div>

              <IconButton color="primary" onClick={handleDeleteTweet}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
