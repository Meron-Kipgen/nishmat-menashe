import React, { useState } from "react";
import styled from "styled-components";
import BodySection from "./BodySection";
import ContentForm from "./ContentForm";
import EditChapterForm from "./EditChapterForm";
import EditContentForm from "./EditContentform"; // Ensure this import is here
import { useBookData } from "./useBookData";
import Modal from "./Modal"; // Ensure this import is here

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Layout = ({ chapters, showEn, showHe, fontSize, gridLayout }) => {
  const { editChapter, editContent, deleteContent, deleteChapter } = useBookData();

  // State for managing editing state for each chapter
  const [editingChapterIds, setEditingChapterIds] = useState({});
  // State for managing editing state for each content
  const [editingContentIds, setEditingContentIds] = useState({});
  // State for managing the modal
  const [modal, setModal] = useState({ isOpen: false, onConfirm: null, message: "" });

  const handleEditChapter = (chapterId) => {
    setEditingChapterIds((prevIds) => ({
      ...prevIds,
      [chapterId]: true,
    }));
  };

  const handleEditContent = (contentId) => {
    setEditingContentIds((prevIds) => ({
      ...prevIds,
      [contentId]: true,
    }));
  };

  const handleCancelEdit = () => {
    setEditingChapterIds({});
    setEditingContentIds({});
  };

  const saveEditedChapter = async (editedData) => {
    const { $id } = editedData;
    try {
      await editChapter($id, editedData);
      setEditingChapterIds((prevIds) => ({
        ...prevIds,
        [$id]: false,
      }));
    } catch (error) {
      console.error("Failed to save edited chapter:", error);
    }
  };

  const saveEditedContent = async (editedData) => {
    const { $id } = editedData;
    try {
      await editContent($id, editedData);
      setEditingContentIds((prevIds) => ({
        ...prevIds,
        [$id]: false,
      }));
    } catch (error) {
      console.error("Failed to save edited content:", error);
    }
  };

  const confirmDeleteContent = (contentId) => {
    setModal({
      isOpen: true,
      message: "Are you sure you want to delete this content?",
      onConfirm: () => handleDeleteContent(contentId),
    });
  };

  const confirmDeleteChapter = (chapterId) => {
    setModal({
      isOpen: true,
      message: "Are you sure you want to delete this chapter?",
      onConfirm: () => handleDeleteChapter(chapterId),
    });
  };

  const handleDeleteContent = async (contentId) => {
    setModal({ isOpen: false });
    try {
      await deleteContent(contentId);
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    setModal({ isOpen: false });
    try {
      await deleteChapter(chapterId);
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false });
  };

  return (
    <div>
      {modal.isOpen && (
        <Modal
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={closeModal}
        />
      )}
      {chapters.map((chapter, chapterIdx) => (
        <div key={`chapter-${chapterIdx}`}>
          {/* Title and Subtitle */}
          {!gridLayout && (
            <div>
              <h3>{showEn && chapter.titleEn}</h3>
              <h4>{showHe && chapter.titleHe}</h4>
              <p>{showEn && chapter.subTitleEn}</p>
              <p>{showHe && chapter.subTitleHe}</p>
              {!editingChapterIds[chapter.$id] && (
                <button onClick={() => handleEditChapter(chapter.$id)}>
                  Edit Chapter
                </button>
              )}
              <button onClick={() => confirmDeleteChapter(chapter.$id)}>
                Delete Chapter
              </button>
            </div>
          )}

          {/* Grid Layout */}
          {gridLayout && (
            <TwoColumnContainer>
              <div>
                <h3>{showEn && chapter.titleEn}</h3>
                <p>{showEn && chapter.subTitleEn}</p>
              </div>
              <div>
                <h4>{showHe && chapter.titleHe}</h4>
                <p>{showHe && chapter.subTitleHe}</p>
              </div>
            </TwoColumnContainer>
          )}

          {/* Edit Chapter Form */}
          {editingChapterIds[chapter.$id] && (
            <EditChapterForm
              chapter={chapter}
              saveEditedChapter={saveEditedChapter}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Contents */}
          {gridLayout ? (
            <TwoColumnContainer>
              {chapter.contents.map((content, contentIdx) => (
                <React.Fragment key={`content-${contentIdx}`}>
                  {showEn && (
                    <BodySection
                      key={`En-body-${contentIdx}`}
                      headingEn={content.headingEn}
                      bodyEn={content.bodyEn}
                      fontSize={fontSize}
                    />
                  )}
                  {showHe && (
                    <BodySection
                      key={`he-body-${contentIdx}`}
                      headingHe={content.headingHe}
                      bodyHe={content.bodyHe}
                      fontSize={fontSize}
                    />
                  )}
                  <button onClick={() => handleEditContent(content.$id)}>
                    Edit Content
                  </button>
                  <button onClick={() => confirmDeleteContent(content.$id)}>
                    Delete Content
                  </button>
                  {editingContentIds[content.$id] && (
                    <EditContentForm
                      content={content}
                      saveEditedContent={saveEditedContent}
                      onCancel={handleCancelEdit}
                    />
                  )}
                </React.Fragment>
              ))}
            </TwoColumnContainer>
          ) : (
            <div>
              {chapter.contents.map((content, contentIdx) => (
                <React.Fragment key={`content-${contentIdx}`}>
                  <BodySection
                    key={`body-section-${contentIdx}`}
                    headingEn={showEn ? content.headingEn : undefined}
                    headingHe={showHe ? content.headingHe : undefined}
                    bodyEn={showEn ? content.bodyEn : undefined}
                    bodyHe={showHe ? content.bodyHe : undefined}
                    fontSize={fontSize}
                  />
                  <button onClick={() => handleEditContent(content.$id)}>
                    Edit Content
                  </button>
                  <button onClick={() => confirmDeleteContent(content.$id)}>
                    Delete Content
                  </button>
                  {editingContentIds[content.$id] && (
                    <EditContentForm
                      content={content}
                      saveEditedContent={saveEditedContent}
                      onCancel={handleCancelEdit}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Add Content Form */}
          <ContentForm chapterId={chapter.$id} />
          </div>
      ))}
    </div>
  );
};

export default Layout;

