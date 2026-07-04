import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  Volume2,
  Globe,
  Smartphone,
  Bot,
  Palette,
  TrendingUp,
  Briefcase,
  Monitor,
  Cloud,
  BarChart3,
  ShoppingCart,
  Wrench,
  BookOpen,
  MessageSquarePlus,
  HelpCircle,
  PhoneCall,
  Video,
  Phone,
  Building2,
  PenLine,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { apiRequest } from "@/lib/queryClient";
import {
  type Language,
  purposes,
  followUpQuestions,
  genericFollowUp,
  meetingModes,
  timeSlots,
  faqEntries,
  uiText,
  menuActions,
} from "@/lib/chatbotData";
import { useSpeechRecognition, speakText } from "@/hooks/useSpeech";

const iconMap: Record<string, any> = {
  Globe, Smartphone, Bot, Palette, TrendingUp, Briefcase, Monitor, Cloud,
  BarChart3, ShoppingCart, Wrench, BookOpen, MessageSquarePlus, HelpCircle,
  PhoneCall, Video, Phone, Building2, PenLine, MessageCircle,
};

type Step =
  | "language"
  | "name"
  | "mobile"
  | "email"
  | "company"
  | "city_state"
  | "purpose"
  | "custom_message"
  | "followup"
  | "meeting_prompt"
  | "meeting_date"
  | "meeting_time"
  | "meeting_mode"
  | "updates_consent"
  | "menu"
  | "faq"
  | "contact"
  | "done";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  company: string;
  cityState: string;
  purpose: string;
  purposeLabel: string;
  customMessage: string;
  answers: Record<string, string>;
  wantsMeeting: boolean;
  meetingDate: string;
  meetingTime: string;
  meetingMode: string;
  wantsUpdates: boolean;
}

const langCodeMap: Record<Language, string> = { en: "en-US", hi: "hi-IN", mr: "mr-IN" };

const initialFormData: FormData = {
  name: "",
  mobile: "",
  email: "",
  company: "",
  cityState: "",
  purpose: "",
  purposeLabel: "",
  customMessage: "",
  answers: {},
  wantsMeeting: false,
  meetingDate: "",
  meetingTime: "",
  meetingMode: "",
  wantsUpdates: false,
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [step, setStep] = useState<Step>("language");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [textInput, setTextInput] = useState("");
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isListening, startListening, isSupported: speechSupported } = useSpeechRecognition(
    langCodeMap[language],
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, step]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: "user", text }]);
  };

  const openChat = async () => {
    setIsOpen(true);
    if (!hasStarted) {
      setHasStarted(true);
      addBotMessage(uiText.welcomeTitle[language]);
      addBotMessage(uiText.welcomeSubtitle[language]);
      try {
        await apiRequest("POST", "/api/chat-events", { type: "chat_started" });
      } catch {
        // non-blocking
      }
    }
  };

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    addUserMessage(lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी");
    addBotMessage(uiText.askName[lang]);
    setStep("name");
  };

  const getFollowUps = () => followUpQuestions[formData.purpose] || genericFollowUp;

  const submitTextValue = () => {
    const value = textInput.trim();
    if (!value) return;
    setTextInput("");

    if (step === "name") {
      setFormData((f) => ({ ...f, name: value }));
      addUserMessage(value);
      addBotMessage(uiText.askMobile[language]);
      setStep("mobile");
    } else if (step === "mobile") {
      setFormData((f) => ({ ...f, mobile: value }));
      addUserMessage(value);
      addBotMessage(uiText.askEmail[language]);
      setStep("email");
    } else if (step === "email") {
      setFormData((f) => ({ ...f, email: value }));
      addUserMessage(value);
      addBotMessage(uiText.askCompany[language]);
      setStep("company");
    } else if (step === "company") {
      const company = value.toLowerCase() === "skip" ? "" : value;
      setFormData((f) => ({ ...f, company }));
      addUserMessage(value);
      addBotMessage(uiText.askCityState[language]);
      setStep("city_state");
    } else if (step === "city_state") {
      setFormData((f) => ({ ...f, cityState: value }));
      addUserMessage(value);
      addBotMessage(uiText.askPurpose[language]);
      setStep("purpose");
    } else if (step === "custom_message") {
      setFormData((f) => ({ ...f, customMessage: value }));
      addUserMessage(value);
      addBotMessage(uiText.askMeeting[language]);
      setStep("meeting_prompt");
    } else if (step === "faq") {
      addUserMessage(value);
      const lower = value.toLowerCase();
      const match = faqEntries.find((entry) =>
        entry.keywords.some((k) => lower.includes(k)),
      );
      if (match) {
        addBotMessage(match.answer[language]);
      } else {
        addBotMessage(uiText.faqFallback[language]);
      }
    }
  };

  const selectPurpose = (purposeId: string, label: string) => {
    addUserMessage(label);
    setFormData((f) => ({ ...f, purpose: purposeId, purposeLabel: label }));
    if (purposeId === "other") {
      addBotMessage(uiText.askCustomMessage[language]);
      setStep("custom_message");
    } else {
      setFollowUpIndex(0);
      const followUps = followUpQuestions[purposeId] || genericFollowUp;
      addBotMessage(followUps[0].question[language]);
      setStep("followup");
    }
  };

  const selectFollowUpOption = (optionId: string, label: string) => {
    addUserMessage(label);
    const followUps = getFollowUps();
    const current = followUps[followUpIndex];
    setFormData((f) => ({ ...f, answers: { ...f.answers, [current.id]: label } }));

    const nextIndex = followUpIndex + 1;
    if (nextIndex < followUps.length) {
      setFollowUpIndex(nextIndex);
      addBotMessage(followUps[nextIndex].question[language]);
    } else {
      addBotMessage(uiText.askMeeting[language]);
      setStep("meeting_prompt");
    }
  };

  const chooseMeeting = (wants: boolean) => {
    addUserMessage(wants ? uiText.meetingYes[language] : uiText.meetingNo[language]);
    setFormData((f) => ({ ...f, wantsMeeting: wants }));
    if (wants) {
      addBotMessage(uiText.askDate[language]);
      setStep("meeting_date");
    } else {
      addBotMessage(uiText.askUpdates[language]);
      setStep("updates_consent");
    }
  };

  const selectDate = (date: Date | undefined) => {
    if (!date) return;
    const formatted = date.toLocaleDateString(langCodeMap[language], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    addUserMessage(formatted);
    setFormData((f) => ({ ...f, meetingDate: formatted }));
    addBotMessage(uiText.askTime[language]);
    setStep("meeting_time");
  };

  const selectTime = (time: string) => {
    addUserMessage(time);
    setFormData((f) => ({ ...f, meetingTime: time }));
    addBotMessage(uiText.askMode[language]);
    setStep("meeting_mode");
  };

  const selectMode = (modeId: string, label: string) => {
    addUserMessage(label);
    setFormData((f) => ({ ...f, meetingMode: label }));
    addBotMessage(uiText.meetingConfirmed[language]);
    addBotMessage(uiText.askUpdates[language]);
    setStep("updates_consent");
  };

  const finalizeConsent = async (wantsUpdates: boolean) => {
    addUserMessage(wantsUpdates ? uiText.meetingYes[language] : uiText.meetingNo[language]);
    const finalData = { ...formData, wantsUpdates };
    setFormData(finalData);
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", {
        name: finalData.name,
        mobile: finalData.mobile,
        email: finalData.email,
        company: finalData.company || undefined,
        city: finalData.cityState,
        state: undefined,
        language,
        purpose: finalData.purposeLabel || finalData.purpose,
        requirementDetails: JSON.stringify({
          answers: finalData.answers,
          customMessage: finalData.customMessage,
        }),
        wantsMeeting: finalData.wantsMeeting,
        meetingDate: finalData.meetingDate || undefined,
        meetingTime: finalData.meetingTime || undefined,
        meetingMode: finalData.meetingMode || undefined,
        wantsUpdates,
      });
    } catch {
      // non-blocking for user experience
    }
    setSubmitting(false);
    addBotMessage(uiText.thankYou[language]);
    addBotMessage(uiText.menuOptions[language]);
    setStep("menu");
  };

  const handleMenuAction = (actionId: string) => {
    const action = menuActions.find((a) => a.id === actionId);
    if (action) addUserMessage(action.label[language]);
    if (actionId === "new_inquiry") {
      setFormData(initialFormData);
      setFollowUpIndex(0);
      addBotMessage(uiText.askPurpose[language]);
      setStep("purpose");
    } else if (actionId === "faq") {
      addBotMessage(uiText.faqPrompt[language]);
      setStep("faq");
    } else if (actionId === "contact") {
      addBotMessage(uiText.contactOptionsTitle[language]);
      setStep("contact");
    }
  };

  const handleVoiceInput = () => {
    startListening((transcript) => {
      setTextInput(transcript);
    });
  };

  const showTextInput = ["name", "mobile", "email", "company", "city_state", "custom_message", "faq"].includes(step);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            size="icon"
            onClick={openChat}
            data-testid="button-open-chat"
            className="h-14 w-14 rounded-full shadow-lg shadow-primary/30 relative"
          >
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
            <MessageCircle className="h-6 w-6 relative z-10" />
          </Button>
        )}

        {isOpen && (
          <div className="w-[92vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col rounded-md border border-primary/20 bg-card shadow-2xl shadow-primary/10 overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-primary/20 bg-background/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" data-testid="text-chat-title">Rajsanyog Assistant</p>
                  <p className="text-xs text-muted-foreground truncate">Be Better. Achieve Greater.</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                data-testid="button-close-chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2" data-testid="container-chat-messages">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`group max-w-[85%] rounded-md px-3 py-2 text-sm break-words ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    data-testid={`message-${m.sender}`}
                  >
                    <span>{m.text}</span>
                    {m.sender === "bot" && (
                      <button
                        onClick={() => speakText(m.text, langCodeMap[language])}
                        className="ml-2 inline-flex align-middle text-muted-foreground hover-elevate rounded-sm p-0.5"
                        data-testid="button-speak-message"
                        aria-label="Play message"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {step === "language" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {(["en", "hi", "mr"] as Language[]).map((lang) => (
                    <Button
                      key={lang}
                      size="sm"
                      variant="outline"
                      onClick={() => selectLanguage(lang)}
                      data-testid={`button-language-${lang}`}
                    >
                      {lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी"}
                    </Button>
                  ))}
                </div>
              )}

              {step === "purpose" && (
                <div className="flex flex-col gap-2 pt-1">
                  {purposes.map((p) => {
                    const Icon = iconMap[p.icon] || MessageCircle;
                    return (
                      <Button
                        key={p.id}
                        size="sm"
                        variant="outline"
                        className="justify-start"
                        onClick={() => selectPurpose(p.id, p.label[language])}
                        data-testid={`button-purpose-${p.id}`}
                      >
                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">{p.label[language]}</span>
                      </Button>
                    );
                  })}
                </div>
              )}

              {step === "followup" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {getFollowUps()[followUpIndex]?.options.map((opt) => (
                    <Button
                      key={opt.id}
                      size="sm"
                      variant="outline"
                      onClick={() => selectFollowUpOption(opt.id, opt.label[language])}
                      data-testid={`button-followup-${opt.id}`}
                    >
                      {opt.label[language]}
                    </Button>
                  ))}
                </div>
              )}

              {step === "meeting_prompt" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" onClick={() => chooseMeeting(true)} data-testid="button-meeting-yes">
                    {uiText.meetingYes[language]}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => chooseMeeting(false)} data-testid="button-meeting-no">
                    {uiText.meetingNo[language]}
                  </Button>
                </div>
              )}

              {step === "meeting_date" && (
                <div className="pt-1 flex justify-center">
                  <Calendar
                    mode="single"
                    disabled={{ before: new Date() }}
                    onSelect={selectDate}
                    className="rounded-md border border-primary/20"
                    data-testid="calendar-meeting-date"
                  />
                </div>
              )}

              {step === "meeting_time" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      size="sm"
                      variant="outline"
                      onClick={() => selectTime(slot)}
                      data-testid={`button-time-${slot.replace(/\s|:/g, "")}`}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              )}

              {step === "meeting_mode" && (
                <div className="flex flex-col gap-2 pt-1">
                  {meetingModes.map((mode) => {
                    const Icon = iconMap[mode.icon] || Video;
                    return (
                      <Button
                        key={mode.id}
                        size="sm"
                        variant="outline"
                        className="justify-start"
                        onClick={() => selectMode(mode.id, mode.label[language])}
                        data-testid={`button-mode-${mode.id}`}
                      >
                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                        {mode.label[language]}
                      </Button>
                    );
                  })}
                </div>
              )}

              {step === "updates_consent" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" disabled={submitting} onClick={() => finalizeConsent(true)} data-testid="button-updates-yes">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : uiText.meetingYes[language]}
                  </Button>
                  <Button size="sm" variant="outline" disabled={submitting} onClick={() => finalizeConsent(false)} data-testid="button-updates-no">
                    {uiText.meetingNo[language]}
                  </Button>
                </div>
              )}

              {step === "menu" && (
                <div className="flex flex-col gap-2 pt-1">
                  {menuActions.map((action) => {
                    const Icon = iconMap[action.icon] || MessageCircle;
                    return (
                      <Button
                        key={action.id}
                        size="sm"
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleMenuAction(action.id)}
                        data-testid={`button-menu-${action.id}`}
                      >
                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                        {action.label[language]}
                      </Button>
                    );
                  })}
                </div>
              )}

              {step === "contact" && (
                <div className="flex flex-col gap-2 pt-1">
                  <a href="mailto:rajsanyog40@gmail.com" data-testid="link-contact-email">
                    <Button size="sm" variant="outline" className="justify-start w-full">
                      <Mail className="h-4 w-4 mr-2 shrink-0" />
                      rajsanyog40@gmail.com
                    </Button>
                  </a>
                  <a href="tel:+917499039470" data-testid="link-contact-call-ankit">
                    <Button size="sm" variant="outline" className="justify-start w-full">
                      <Phone className="h-4 w-4 mr-2 shrink-0" />
                      Call Ankit Kapse: +91 74990 39470
                    </Button>
                  </a>
                  <a href="tel:+919423245297" data-testid="link-contact-call-ganesh">
                    <Button size="sm" variant="outline" className="justify-start w-full">
                      <Phone className="h-4 w-4 mr-2 shrink-0" />
                      Call Ganesh Chondekar: +91 94232 45297
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/917499039470"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-whatsapp"
                  >
                    <Button size="sm" variant="outline" className="justify-start w-full">
                      <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rajsanyog+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-maps"
                  >
                    <Button size="sm" variant="outline" className="justify-start w-full">
                      <MapPin className="h-4 w-4 mr-2 shrink-0" />
                      Find us on Google Maps
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      addBotMessage(uiText.menuOptions[language]);
                      setStep("menu");
                    }}
                    data-testid="button-back-to-menu"
                  >
                    ← Back
                  </Button>
                </div>
              )}
            </div>

            {showTextInput && (
              <div className="border-t border-primary/20 p-2 flex items-center gap-2 bg-background/60">
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitTextValue();
                  }}
                  placeholder={uiText.typePlaceholder[language]}
                  data-testid="input-chat-message"
                />
                {speechSupported && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleVoiceInput}
                    data-testid="button-voice-input"
                    className={isListening ? "text-primary" : ""}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                <Button size="icon" onClick={submitTextValue} data-testid="button-send-message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === "faq" && (
              <div className="px-3 pb-2 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    addBotMessage(uiText.menuOptions[language]);
                    setStep("menu");
                  }}
                  data-testid="button-faq-back"
                >
                  ← Back to menu
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
