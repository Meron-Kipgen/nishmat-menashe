import React, { useState } from "react";
import styled from "styled-components";
import { usePdfData } from "./usePdfData";
import PdfUpdate from "./PdfUpdate"; // Import the PdfUpdate component
import { DotHorizon } from "../../Assets/Icons";
import WarningDelete from "../../components/WarningDelete"; // Import the WarningDelete component

const Thumbnail = styled.div`
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  height: 120px;
  width: 120px;
  img {
    height: 120px;
    width: 120px;
    transition: transform 0.3s ease;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 400px;
  height: 150px;
  border: 1px solid #ddd;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
  position: relative;

  &:hover ${Thumbnail}, &:focus-within ${Thumbnail} {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    gap: 10px;
    width: 100%;
    padding: 10px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DropMenu = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
  top: 0;
  cursor: pointer;
`;
const DropMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 30px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
`;
const ButtonWrapper = styled.div`
  display: flex;

  gap: 10px;
`;

const ActionBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background: ${props => props.bgColor};
  padding: 5px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
`;

const Modal = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 50%;
  margin-top: 45px;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Parasha = styled.h2`
font-size: 15px;

  line-height: 1.6;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default function PdfCard({
  volume,
  parasha,
  yearHe,
  yearEn,
  pdfUrl,
  issue,
  pdfId,
}) {
  const { updatePdf, deletePdf } = usePdfData(); // Use context for updating and deleting

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState(false);

  const handleUpdateClick = () => setShowUpdateModal(true);
  const handleDeleteClick = () => setShowDeleteModal(true);

  const handleUpdateSubmit = async (pdfId, updatedData) => {
    await updatePdf(pdfId, updatedData);
    setShowUpdateModal(false);
  };

  const handleDeleteConfirm = async () => {
    await deletePdf(pdfId);
    setShowDeleteModal(false);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          url: pdfUrl,
        })
        .catch(console.error);
    } else {
      alert(
        "This browser doesn't support the Share API. Copy this link to share: " +
          pdfUrl
      );
    }
  };
  const dropmenuhandle = () => {
    setShowDropMenu(!showDropMenu);
  };

  return (
    <>
      <Container>
        <Thumbnail>
          <img src="../alon.png" alt="Thumbnail" />
        </Thumbnail>
        <InfoSection>
          <DropMenu onClick={dropmenuhandle}>
            <DotHorizon height={30} width={30} />
          </DropMenu>
          {showDropMenu && (
            <DropMenuWrapper>
              <ActionBtn bgColor="#f0ad4e" onClick={handleUpdateClick}>
                Edit
              </ActionBtn>
              <ActionBtn bgColor="#d9534f" onClick={handleDeleteClick}>
                Delete
              </ActionBtn>
            </DropMenuWrapper>
          )}
          <h1>
            Vol.{volume} Issue.{issue}
          </h1>
          <Parasha>Parasha: {parasha}</Parasha>
          <p>
            Year: {yearHe} - {yearEn}
          </p>
          <ButtonWrapper>
            <ActionBtn
              bgColor="#142b42"
              onClick={() => (window.location.href = pdfUrl)}
            >
              Download
            </ActionBtn>
            <ActionBtn bgColor="#007bff" onClick={handleShareClick}>
              Share
            </ActionBtn>
          </ButtonWrapper>
        </InfoSection>
      </Container>

      {/* Update Modal */}
      <Overlay
        show={showUpdateModal}
        onClick={() => setShowUpdateModal(false)}
      />
      <Modal show={showUpdateModal}>
        <PdfUpdate
          pdfId={pdfId}
          onUpdate={handleUpdateSubmit}
          onCancel={() => setShowUpdateModal(false)}
        />
      </Modal>

      {/* Delete Modal */}
      {showDeleteModal && (
        <WarningDelete
          message="Are you sure you want to delete this PDF?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
