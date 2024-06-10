import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

export default function FeedbackForm() {
  const addItemToList = useFeedbackItemsStore(state => state.addItemToList)
  const [textInput, setTextInput] = useState("");
  const [showValidIndicatior, setShowValidIndicator] = useState(false);
  const [showInValidIndicatior, setShowInValidIndicator] = useState(false);
  const charCount = MAX_CHARACTERS - textInput.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setTextInput(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textInput.includes("#") && textInput.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInValidIndicator(true);
      setTimeout(() => setShowInValidIndicator(false), 2000);
      return;
    }
    addItemToList(textInput);
    setTextInput("");
  };

  return (
    <form
      className={`form ${showValidIndicatior ? "form--valid" : ""} 
      ${showInValidIndicatior ? "form--invalid" : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        value={textInput}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="text"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
