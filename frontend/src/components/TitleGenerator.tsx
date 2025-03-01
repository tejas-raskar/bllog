import { Button, Dialog, DialogBody, DialogHeader, Typography } from "@material-tailwind/react";
import { Editor } from "@tiptap/react";
import { Sparkle, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface TitleGeneratorProps {
  editor: Editor | null;
  setTitle: (title: string) => void;
  currentTitle: string;
}

export const TitleGenerator = ({ editor, setTitle, currentTitle }: TitleGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [topicInput, setTopicInput] = useState("");

  const handleOpen = () => {
    setOpen(true);

    // Check if editor has content
    const hasContent = editor && editor.getText().trim().length > 0;

    if (!hasContent) {
      setShowInput(true);
    } else {
      generateTitles();
    }
  };

  const generateTitles = async (topic?: string) => {
    setLoading(true);
    setShowInput(false);

    try {
      let content = "";

      if (topic) {
        content = topic;
      } else if (editor) {
        content = editor.getText().substring(0, 1000); // First 1000 chars for context
      }

      if (!content.trim()) {
        setTitles(["Please provide some context about your blog topic"]);
        setLoading(false);
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/ai/generate-titles`, {
        content,
        currentTitle
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      setTitles(response.data.titles);
    } catch (error) {
      console.error("Failed to generate titles", error);
      setTitles(["Could not generate titles at this time."]);
    } finally {
      setLoading(false);
    }
  };

  const selectTitle = (title: string) => {
    setTitle(title);
    setOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={handleOpen} className="shadow-none p-3 rounded-full text-xl hover:bg-[#BEA1FA]/20 hover:shadow-none hover:border-[#FF8C4B]/20" color="white" >
          <div className="relative">
            <Sparkle size={22} className="-translate-x-1 -translate-y-1 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
            <Sparkle size={15} className="absolute -bottom-0.5 -right-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
            <svg width="0" height="0">
              <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#BEA1FA" offset="0%" />
                <stop stopColor="#FF8C4B" offset="100%" />
              </linearGradient>
            </svg>
          </div>
        </button>
      </div>

      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        placeholder
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
        className="font-subtitle"
      >
        <DialogHeader
          className="flex justify-between border-b pb-4"
          placeholder
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkle size={22} className="-translate-x-1 -translate-y-1 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
              <Sparkle size={15} className="absolute -bottom-0.5 -right-0.5 text-transparent" style={{ fill: "url(#sparklesGradient)" }} />
              <svg width="0" height="0">
                <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#BEA1FA" offset="0%" />
                  <stop stopColor="#FF8C4B" offset="100%" />
                </linearGradient>
              </svg>
            </div>
            <span className="font-headline font-bold">AI Title Suggestions</span>
          </div>
          <Button
            variant="text"
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 transition-colors"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            <X size={20} />
          </Button>
        </DialogHeader>
        <DialogBody className="h-[300px] overflow-y-auto" placeholder onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
          {loading ? (
            <div className="flex flex-col justify-center h-full gap-4 mx-3">
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="h1"
                className="h-6 w-full rounded-md bg-gray-200"
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
              >
                &nbsp;
              </Typography>
            </div>
          ) : showInput ? (
            <div className="space-y-4 py-4">
              <p className="font-normal font-subtitle">
                Please tell us what your blog is about, and we'll generate title suggestions for you:
              </p>
              <textarea placeholder="E.g., A guide to modern web development practices" value={topicInput} onChange={(e) => setTopicInput(e.target.value)} className="resize-none w-full p-3 border-2 border-gray-200 rounded-md font-subtitle focus:outline-none focus:border-2 focus:border-gray-600" rows={4} />
              <div className="flex justify-end">
                <Button onClick={() => generateTitles(topicInput)} className="shadow-none normal-case font-headline text-sm p-2 hover:shadow-none" placeholder onPointerEnterCapture onPointerLeaveCapture disabled={!topicInput.trim()}>
                  Generate Title
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 py-2">
              {titles.map((title, index) => (
                <div key={index}>
                  <Button
                    className="w-full justify-start text-left bg-white text-black shadow-none hover:shadow-none hover:bg-gray-100 text-sm font-headline normal-case"
                    onClick={() => selectTitle(title)} placeholder onPointerEnterCapture onPointerLeaveCapture>
                    {title}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};