import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Pencil, AlertCircle, BookOpenCheckIcon, Maximize2, SwatchBook, FileArchive, ArrowLeft, BriefcaseBusiness, PartyPopper, Handshake, GraduationCap, Brain } from "lucide-react";
import { toast } from "sonner";

interface AIContextMenuProps {
    editor: Editor;
    onClose: () => void;
}

type AIAction = 'expand' | 'fix' | 'tone' | 'rewrite' | 'summarize';
type ToneOption = 'professional' | 'casual' | 'enthusiastic' | 'formal' | 'simple';

const actionDescriptions: Record<AIAction, string> = {
    fix: "Fixing grammar & spelling",
    expand: "Expanding text",
    rewrite: "Rewriting content",
    summarize: "Summarizing content",
    tone: "Changing tone"
};

export const AIContextMenu = ({ editor, onClose }: AIContextMenuProps) => {
    const [loading, setLoading] = useState<AIAction | null>(null);
    const [showTones, setShowTones] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setShowTones(false);
    }, []);

    const getSelectedText = () => {
        const { from, to } = editor.state.selection;
        return editor.state.doc.textBetween(from, to, ' ');
    };

    const replaceSelectedText = (newText: string) => {
        const { from, to } = editor.state.selection;
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };

    const handleAIAction = async (action: AIAction, tone?: ToneOption) => {
        const selectedText = getSelectedText();
        if (!selectedText || selectedText.length < 2) {
            toast.error('Please select more text to modify');
            return;
        }

        setLoading(action);
        const toastId = toast.loading(
            tone ? `${actionDescriptions[action]} to ${tone}...` : `${actionDescriptions[action]}...`
        );

        try {
            const endpoint = `/api/v1/ai/${action}-text`;

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
                {
                    content: selectedText,
                    tone: tone
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            );

            if (response.data.result) {
                replaceSelectedText(response.data.result);
                toast.success(
                    tone ? `Text tone changed to ${tone} style` : `Text ${action === 'fix' ? 'corrected' : action === 'expand' ? 'expanded' : action === 'summarize' ? 'summarized' : 'improved'} successfully`, 
                    { id: toastId, duration: 3000 }
                );
            } else {
                toast.error('No changes were made to the text', { id: toastId });
            }

            onClose();
        } catch (error) {
            console.error(`Failed to ${action} text:`, error);
            setError(`Failed to ${action} text`);
            toast.error(`Couldn't ${action} text. Please try again.`, { id: toastId });
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(null);
        }
    };

    const handleShowTones = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowTones(true);
    };

    const menuItem = (action: AIAction, icon: JSX.Element, label: string, description: string, onClick: () => void) => (
        <button
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left transition-colors duration-150 rounded-md my-0.5 font-subtitle"
            onClick={onClick}
            disabled={!!loading}
            title={description}
        >
            <div className="p-1 rounded-md bg-gray-50 border border-gray-100">
                {loading === action ? <Loader2 size={16} className="animate-spin" /> : icon}
            </div>
            <span>{label}</span>
        </button>
    );

    const toneOptionsList = [
        { value: 'professional', color: 'blue', icon: <BriefcaseBusiness size={17} />, description: 'Formal, business-like' },
        { value: 'casual', color: 'green', icon: <Handshake size={17} />, description: 'Conversational, relaxed' },
        { value: 'enthusiastic', color: 'orange', icon: <PartyPopper size={17} />, description: 'Energetic, excited' },
        { value: 'formal', color: 'purple', icon: <GraduationCap size={17} />, description: 'Academic, precise' },
        { value: 'simple', color: 'teal', icon: <Brain size={17} />, description: 'Clear, easy-to-understand' }
    ] as const;

    return (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-60 z-50 transform transition-all duration-150 ease-in-out">
            <div className="py-1 px-1">
                {error && (
                    <div className="px-3 py-2 text-xs text-red-500 bg-red-50 rounded-md flex items-center gap-1 mb-1">
                        <AlertCircle size={12} />
                        <span>{error}</span>
                    </div>
                )}

                {showTones ? (
                    <div>
                        <div className="px-1 font-semibold text-gray-500 flex items-center">
                            <button onClick={() => setShowTones(false)} className=" hover:bg-gray-100 hover:text-black p-2 rounded-lg flex items-center gap-1 transition-colors">
                                <ArrowLeft size={17} />
                            </button>
                            <span className="ml-2 font-subtitle text-sm">Select Tone</span>
                        </div>
                        <div className="max-h-64 overflow-y-auto px-1 font-subtitle">
                            {toneOptionsList.map(({ value, color, icon, description }) => (
                                <button
                                    key={value}
                                    className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left capitalize rounded-md my-0.5 transition-colors duration-150 ${loading ? 'opacity-50' : 'opacity-100'}`}
                                    onClick={() => handleAIAction('tone', value as ToneOption)}
                                    disabled={!!loading}
                                    title={description}
                                >
                                    <div className={`p-1.5 rounded-md bg-${color}-50 border border-${color}-100`}>
                                        {icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{value}</span>
                                        <span className="text-sm text-gray-400">{description}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1 px-1">
                        {menuItem(
                            'fix', 
                            <BookOpenCheckIcon size={17}  className=""/>,
                            "Fix grammar & spelling",
                            "Correct grammatical errors and typos",
                            () => handleAIAction('fix')
                        )}

                        {menuItem(
                            'expand', 
                            <Maximize2 size={17} />,
                            "Expand text",
                            "Make your text more detailed and comprehensive",
                            () => handleAIAction('expand')
                        )}

                        {menuItem(
                            'rewrite', 
                            <Pencil size={17} />,
                            "Rewrite",
                            "Improve the clarity and flow of your text",
                            () => handleAIAction('rewrite')
                        )}

                        {menuItem(
                            'summarize', 
                            <FileArchive size={17} />,
                            "Summarize",
                            "Create a concise version of longer text",
                            () => handleAIAction('summarize')
                        )}

                        <button
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left transition-colors duration-150 rounded-md my-0.5"
                            onClick={handleShowTones}
                            disabled={!!loading}
                            title="Change the style and voice of your text"
                        >
                            <div className="p-1 rounded-md bg-gray-50 border border-gray-100">
                                <SwatchBook size={17} />
                            </div>
                            <span>Change tone</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};