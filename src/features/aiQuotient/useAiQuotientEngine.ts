import { useCallback, useMemo, useReducer } from 'react';
import {
  questions,
  pillars,
  getTotalPossibleScore,
  getMaxPillarScore,
} from '@/data/aiQuotientQuestions';
import { UserInfo, Answer, PillarScore } from '@/types/aiQuotient';
import { submitToHubspot } from '@/utils/hubspotSubmission';

// -------------------------
// Types
// -------------------------

type Step = 'user-info' | 'questions' | 'results';

interface State {
  step: Step;
  userInfo: UserInfo;
  currentQuestionIndex: number;
  answers: Answer[];
  isSubmitting: boolean;
  isSubmitted: boolean;
}

interface Action {
  type:
    | 'SET_USER_INFO'
    | 'ANSWER_QUESTION'
    | 'PREVIOUS_QUESTION'
    | 'SUBMIT'
    | 'SUBMISSION_SUCCESS'
    | 'RESET';
  payload?: any;
}

// -------------------------
// Initial State
// -------------------------
const initialState: State = {
  step: 'user-info',
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  },
  currentQuestionIndex: 0,
  answers: [],
  isSubmitting: false,
  isSubmitted: false,
};

// -------------------------
// Reducer
// -------------------------
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload as UserInfo,
        step: 'questions',
        currentQuestionIndex: 0,
      };

    case 'ANSWER_QUESTION': {
      const { questionId, optionId, value, pillar } = action.payload as Answer;
      const existing = state.answers.filter((a) => a.questionId !== questionId);
      return {
        ...state,
        answers: [...existing, { questionId, optionId, value, pillar }],
        currentQuestionIndex: state.currentQuestionIndex + 1,
        step:
          state.currentQuestionIndex + 1 >= questions.length
            ? 'results'
            : 'questions',
      };
    }

    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case 'SUBMIT':
      return { ...state, isSubmitting: true };

    case 'SUBMISSION_SUCCESS':
      return { ...state, isSubmitting: false, isSubmitted: true };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// -------------------------
// Helper functions
// -------------------------
function calculatePillarScores(answers: Answer[]) {
  const pillarMap: Record<string, number> = {};
  answers.forEach((ans) => {
    pillarMap[ans.pillar] = (pillarMap[ans.pillar] || 0) + ans.value;
  });

  const scores = Object.entries(pillarMap).map(([pillar, score]) => {
    const maxScore = getMaxPillarScore(pillar);
    return {
      pillar: pillar as any,
      score,
      maxScore,
      percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
    } as PillarScore;
  });

  return scores;
}

// -------------------------
// Hook
// -------------------------
export function useAiQuotientEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derived values ---------------------------------------------------
  const totalSteps = questions.length;
  const pillarScores = useMemo(() => calculatePillarScores(state.answers), [state.answers]);
  const totalScore = useMemo(() => state.answers.reduce((t, a) => t + a.value, 0), [state.answers]);
  const maxPillarScores = useMemo(
    () =>
      pillars.map((p) => ({
        name: p.name,
        maxScore: getMaxPillarScore(p.name),
      })),
    []
  );

  // Actions -----------------------------------------------------------
  const handleUserInfoSubmit = useCallback((data: UserInfo) => {
    dispatch({ type: 'SET_USER_INFO', payload: data });
  }, []);

  const handleNext = useCallback(
    (formData: { answer: string }) => {
      const currentQuestion = questions[state.currentQuestionIndex];
      if (!currentQuestion) return;
      const selectedOption = currentQuestion.options.find((o) => o.value === formData.answer);
      if (!selectedOption) return;
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: {
          questionId: state.currentQuestionIndex,
          optionId: selectedOption.value,
          value: selectedOption.score,
          pillar: currentQuestion.pillar as any,
        } as unknown as Answer,
      });
    },
    [state.currentQuestionIndex]
  );

  const handlePrevious = useCallback(() => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, []);

  const handleSubmitResults = useCallback(async () => {
    dispatch({ type: 'SUBMIT' });
    try {
      await submitToHubspot({
        userInfo: state.userInfo,
        score: totalScore,
        totalPossible: getTotalPossibleScore(),
        pillarScores,
      });
      dispatch({ type: 'SUBMISSION_SUCCESS' });
    } catch (err) {
      console.error('HubSpot submission failed', err);
      dispatch({ type: 'SUBMISSION_SUCCESS' }); // still mark as submitted so UI shows confirmation
    }
  }, [state.userInfo, totalScore, pillarScores]);

  // Progress within current pillar -----------------------------------
  const getPillarProgress = useCallback(() => {
    const currentQuestion = questions[state.currentQuestionIndex];
    const currentPillar = currentQuestion?.pillar ?? undefined;
    const pillarQuestionCount = currentPillar
      ? questions.filter((q) => q.pillar === currentPillar).length
      : 0;
    const answeredInPillar = state.answers.filter((a) => a.pillar === currentPillar).length;

    return {
      currentPillar,
      pillarQuestionCount,
      pillarProgress: answeredInPillar + 1,
    };
  }, [state.currentQuestionIndex, state.answers]);

  // API expected by UI components ------------------------------------
  return {
    state: {
      currentStep: state.step === 'questions' ? 'questions' : state.step, // keep same labels
      userInfo: state.userInfo,
      answers: state.answers,
      score: totalScore,
      pillarScores,
      showResults: state.step === 'results',
      isSubmitting: state.isSubmitting,
      isSubmitted: state.isSubmitted,
      totalSteps,
      maxPillarScores,
    },
    actions: {
      handleUserInfoSubmit,
      handleNext,
      handlePrevious,
      handleSubmitResults,
    },
    getPillarProgress,
  } as const;
}

export { useAiQuotientEngine as default }; 