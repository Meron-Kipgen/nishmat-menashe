

export const DotHorizon = ({ width, height }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="icon icon-tabler icon-tabler-dots" 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="#000000" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

export const SaveIcon = () => (
    <svg width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
      <path d="M1.5 0a.5.5 0 0 1 .5.5V3h13V.5a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5V3h-1V1H1v2H0V1a.5.5 0 0 1 .5-.5h.5zM0 4v11a.5.5 0 0 0 .5.5H2v-1H1V5H.5A.5.5 0 0 0 0 5.5V4zm4 11V5h8v10H4z"/>
    </svg>
  );
  
export const CancelIcon = () => (
  <svg width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
    <path d="M1.5 0a.5.5 0 0 1 .5.5V3h13V.5a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5V3h-1V1H1v2H0V1a.5.5 0 0 1 .5-.5h.5zM0 4v11a.5.5 0 0 0 .5.5H2v-1H1V5H.5A.5.5 0 0 0 0 5.5V4zm4 11V5h8v10H4z"/>
  </svg>
);

export const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 3l4 4l-11 11h-4v-4z" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
);

export const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 -1a2 2 0 0 1 1.5 -.5l10 0a2 2 0 0 1 1.5 .5l1 1" />
    <path d="M10 7l0 -2a2 2 0 0 1 4 0l0 2" />
  </svg>
);

export const UserPic = () => (

    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" stroke-width="0" fill="currentColor" />
  </svg>
)