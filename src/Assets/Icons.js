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
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

export const CancelIcon = ({ height, width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-playstation-x"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
    <path d="M8.5 8.5l7 7" />
    <path d="M8.5 15.5l7 -7" />
  </svg>
);

export const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-pencil"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#000000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3l4 4l-11 11h-4v-4z" />
    <path d="M13.5 6.5l4 4" />
  </svg>
);

export const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#000000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 -1a2 2 0 0 1 1.5 -.5l10 0a2 2 0 0 1 1.5 .5l1 1" />
    <path d="M10 7l0 -2a2 2 0 0 1 4 0l0 2" />
  </svg>
);

export const UserPic = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-user-filled"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#00bfd8"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"
      stroke-width="0"
      fill="currentColor"
    />
    <path
      d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
      stroke-width="0"
      fill="currentColor"
    />
  </svg>
);

export const GuestIcon = ({ height, width, stroke = "#F47838" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-user-circle"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </svg>
);

export const CameraIcon = ({ height, width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-camera-plus"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
    <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  </svg>
);
export const SaveIcon = ({ height, width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-checks"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 12l5 5l10 -10" />
    <path d="M2 12l5 5m5 -5l5 -5" />
  </svg>
);

export const CommentIcon = ({ height, width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-message"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 9h8" />
    <path d="M8 13h6" />
    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
  </svg>
);
export const ShareIcon = ({ height, width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-message"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M8.7 10.7l6.6 -3.4" />
    <path d="M8.7 13.3l6.6 3.4" />
  </svg>
);
export const SearchIcon = ({ height, width, stroke = "white" }) => (
  <svg
    class="feather feather-search"
    fill="none"
    height={height}
    stroke={stroke}
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

export const BackIcon = ({ height, width, stroke = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-arrow-back-up"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 14l-4 -4l4 -4" />
    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
  </svg>
);

export const FeedIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 8h18" />
    <path d="M3 16h18" />
    <path d="M8 3v18" />
    <path d="M16 3v18" />
  </svg>
);

export const VideoIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
    <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
  </svg>
);

export const AudioIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <path d="M8 21l8 0" />
    <path d="M12 17l0 4" />
  </svg>
);
export const ArticleIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 9a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    <path d="M4 12v-5a3 3 0 1 1 6 0v5" />
    <path d="M4 9h6" />
    <path d="M20 6v6" />
    <path d="M4 16h12" />
    <path d="M4 20h6" />
    <path d="M14 20l2 2l5 -5" />
  </svg>
);

export const LibraryIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    <path d="M5 8h4" />
    <path d="M9 16h4" />
    <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
    <path d="M14 9l4 -1" />
    <path d="M16 16l3.923 -.98" />
  </svg>
);
export const QnAIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6" />
    <path d="M13 15l5 5" />
  </svg>
);


export const MaximizeIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>

  <path d="M16 4l4 0l0 4" />
  <path d="M14 10l6 -6" />
  <path d="M8 20l-4 0l0 -4" />
  <path d="M4 20l6 -6" />
  <path d="M16 20l4 0l0 -4" />
  <path d="M14 14l6 6" />
  <path d="M8 4l-4 0l0 4" />
  <path d="M4 4l6 6" />

  </svg>
);
export const MinimizeIcon = ({ height, width, stroke = "#2c3e50" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-grid-3x3"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="2.3"
    stroke={stroke}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>

  <path d="M5 9l4 0l0 -4" />
  <path d="M3 3l6 6" />
  <path d="M5 15l4 0l0 4" />
  <path d="M3 21l6 -6" />
  <path d="M19 9l-4 0l0 -4" />
  <path d="M15 9l6 -6" />
  <path d="M19 15l-4 0l0 4" />
  <path d="M15 15l6 6" />


  </svg>
);