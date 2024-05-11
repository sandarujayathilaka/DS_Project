import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

export default function ViewCourse() {
    const [courseData, setCourseData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cou/course/${id}`);
                setCourseData(response.data);
            } catch (error) {
                console.error('Error occurred while fetching course:', error);
            }
        };

        getCourse();
    }, [id]);

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-200">
            <div className="bg-white p-8 rounded shadow-md w-96 mt-2 mb-2">
                <h1 className="text-center mb-4 text-xl font-bold">View Course</h1>
                <p>Course Code: {courseData.c_code}</p>
                <p>Course Name: {courseData.c_name}</p>
                <p>Category: {courseData.c_category}</p>
                <p>Description: {courseData.c_description}</p>
                <p>Instructor: {courseData.instructor}</p>

                <h2 className="mt-4 mb-2 text-lg font-bold">Videos</h2>
                {courseData.videos.map((video, index) => (
                    <div key={index} className="mb-4">
                        <p className="font-bold">Video Title: {video.title}</p>
                        {isYouTubeUrl(video.url) ? (
                            <YouTubeVideo videoUrl={video.url} />
                        ) : (
                            <GoogleDriveVideo videoUrl={video.url} />
                        )}
                    </div>
                ))}

                <h2 className="mt-4 mb-2 text-lg font-bold">Enrolled Students</h2>
                {courseData.enrollStudents.length > 0 ? (
                    <ul>
                        {courseData.enrollStudents.map(student => (
                            <li key={student._id}>{student.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No students enrolled yet.</p>
                )}
            </div>
        </div>
    );
}

// Helper function to check if the URL is a YouTube URL
function isYouTubeUrl(url) {
    return url.includes("youtube.com") || url.includes("youtu.be");
}

// Component to render YouTube videos using react-youtube library
function YouTubeVideo({ videoUrl }) {
    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
        return <p>Invalid YouTube video URL</p>;
    }

    const opts = {
        height: "400",
        width: "100%",
    };

    return <YouTube videoId={videoId} opts={opts} />;
}

// Helper function to extract video ID from YouTube URL
function getYouTubeVideoId(url) {
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
}

// Component to render Google Drive video as an embedded iframe
function GoogleDriveVideo({ videoUrl }) {
    const getEmbeddedUrl = (url) => {
        const fileId = extractFileId(url);

        if (!fileId) {
            return null;
        }

        return `https://drive.google.com/file/d/${fileId}/preview`;
    };

    const extractFileId = (url) => {
        const match = url.match(/\/file\/d\/(.+?)\/view/);
        return match ? match[1] : null;
    };

    const embeddedUrl = getEmbeddedUrl(videoUrl);

    if (!embeddedUrl) {
        return <p>Invalid Google Drive video URL</p>;
    }

    return (
        <div className="google-drive-video-container">
            <iframe
                title="Google Drive Video"
                src={embeddedUrl}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
}
