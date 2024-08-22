import { useMemo } from 'react';

import { useAudioData } from '../Audio/useAudioData';
import { useVideosData } from '../Video/useVideosData';
import { useArticlesData } from '../Articles/useArticlesData';
import { useQuestionAnswerData } from '../QuestionAnswer/useQuestionAnswerData';
import { useFeedbackData } from "../../Features/Feedback/useFeedbackData"

export const useAllPosts = () => {
    const { audioData, audioLoading, audioError } = useAudioData();
    const { videoData, videoLoading, videoError } = useVideosData();
    const { articleData, articleLoading, articleError } = useArticlesData();
    const { QuestionAnswerData, qaLoading, qaError } = useQuestionAnswerData();
    const { feedbackData, feedbackLoading, feedbackError } = useFeedbackData();

    const posts = useMemo(() => {
        const allPosts = [
            ...(audioData || []).map(post => ({ ...post, type: 'audio' })),
            ...(videoData || []).map(post => ({ ...post, type: 'video' })),
            ...(articleData || []).map(post => ({ ...post, type: 'article' })),
            ...(QuestionAnswerData || []).map(post => ({ ...post, type: 'QnA' })),
            ...(feedbackData || []).map(post => ({ ...post, type: 'feedback' })),
        ];

        // Sort posts by timestamp in descending order
        return allPosts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    }, [audioData, videoData, articleData, QuestionAnswerData, feedbackData]);

    return {
        posts,
        loading: audioLoading || videoLoading || articleLoading || qaLoading || feedbackLoading,
        error: audioError || videoError || articleError || qaError || feedbackError,
    };
};
