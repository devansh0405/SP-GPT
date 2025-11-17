import cross_icon from './cross_icon.png'
import profile_icon from './profile_icon.png'
import logout_icon from './logout_icon.png'
import progress from './progress.png'
import chatbot from './chatbot.jpg'
import notification from './notification.jpg'
import dark_theme from './dark_theme.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import linkedin_icon from './linkedin_icon.png'
import career from './career.jpg'
import learning_module from './learning_module.png'
import academic_tracker from './academic_tracker.jpg'
import header_image from './header_image.jpg'
import text_to_speech_ai from './text_to_speech_ai.jpg'
import login_background from './login_background.jpg'

export const assets = {
    cross_icon,
    profile_icon,
    logout_icon,
    chatbot,
    notification,
    dark_theme,
    progress,
    facebook_icon, linkedin_icon, twitter_icon,
    header_image, login_background
}

export const module_list = [
    {
        _id:1,
        name: "Learning Module",
        description: "A smart study companion with YouTube video summarization, revision through flashcards, and practice tests. Your progress is tracked in the database, enabling personalized revisions and topic-based filtering for a tailored learning experience.",
        image:learning_module
    },
    {
        _id: 2,
        name: "Academic Tracker",
        description:"Stay on top of your studies with an integrated academic calendar, class timetables, assignment deadlines, and project timelines — all in one place to keep you organized and on track.",
        image: academic_tracker
    },
    {
        _id:3 ,
        name: "Career Enhancement",
        description:"Boost your career with smart tools for job search, resume and cover letter building, AI-powered interviews, personalized course recommendations, and an upskilling roadmap that integrates seamlessly with your academic tracker.",
        image: career
    },
    /*{
        _id: 4,
        name: "Brainrot B.Tech",
        description:"dshfoho oijadoih oahhaf",
        image: text_to_speech_ai
    }*/
]
