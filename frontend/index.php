<!doctype html>
<html data-server-time="<?= (int)(microtime(true) * 1000) ?>">
<head>
  <meta charset="utf-8">
  <meta content="initial-scale=1, width=device-width" name="viewport">
  <title>WebRTC</title>
  <link href="/css/index.css" rel="stylesheet">
  <link href="/css/modal.css" rel="stylesheet">
</head>
<body>
  <dialog aria-labelledby="modalTitle" id="modalOuter">
    <h2 id="modalTitle">&nbsp;</h2>
    <button aria-label="Close modal" id="modalClose"></button>
    <div id="modalInner"></div>
  </dialog>
  <div id="top">
    <nav id="nav">
      <div id="navVideo">
        <div id="navVideoDevices">
          <button data-i18n="hangUp" disabled id="navVideoHangUp">
            <svg class="navVideoHangUp" fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5814 1.41895L1 16.9737M10.522 12.6529L11.2329 11.4703C11.4421 11.1221 11.5466 10.9481 11.6948 10.8432C11.8256 10.7508 11.9794 10.6962 12.1393 10.6859C12.3205 10.6741 12.5117 10.7435 12.8938 10.8822L15.6698 11.8899C15.9982 12.0092 16.1625 12.0688 16.2836 12.1739C16.3906 12.2667 16.4732 12.3843 16.5239 12.5164C16.5814 12.6659 16.5814 12.8404 16.5814 13.1893V15.6239C16.5814 16.0388 16.5814 16.2463 16.4955 16.4241C16.4243 16.5715 16.2897 16.7161 16.1478 16.7977C15.9763 16.8962 15.788 16.9099 15.4114 16.9375C15.0831 16.9615 14.7517 16.9737 14.4174 16.9737C12.0623 16.9737 9.84896 16.368 7.92509 15.3041M4.92852 13.0519C2.52074 10.6308 1 7.26054 1 3.57933C1 3.24558 1.01223 2.91467 1.03626 2.58705C1.06384 2.21105 1.07763 2.02305 1.17633 1.85191C1.25808 1.71017 1.40295 1.57575 1.55053 1.50471C1.7287 1.41895 1.93651 1.41895 2.35213 1.41895H4.7909C5.1404 1.41895 5.31516 1.41895 5.46497 1.47637C5.5973 1.52709 5.71513 1.60948 5.8081 1.7163C5.91336 1.83722 5.97308 2.00118 6.09253 2.32908L7.10195 5.10028C7.24089 5.48179 7.3104 5.67254 7.29863 5.85352C7.28824 6.01311 7.23362 6.16668 7.14099 6.29715C7.03596 6.44511 6.86161 6.54954 6.51291 6.7584L5.32818 7.46802C5.84103 8.59635 6.59191 9.65563 7.45678 10.528" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
            <svg class="navArrow" fill="none" height="5" viewBox="0 0 9 5" width="9" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.50258 3.7587L0.734061 0L0 0.731145L4.13555 4.85027C4.23241 4.94617 4.36343 5 4.5 5C4.63657 5 4.76759 4.94617 4.86445 4.85027L9 0.731145L8.27111 0.00514903L4.50258 3.7587Z" stroke="currentColor"/>
            </svg>
          </button>
          <button data-i18n="microphone" id="navVideoMicrophone">
            <svg class="svgColorWB" fill="none" height="19" viewBox="0 0 13 19" width="13" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M9.28573 3.84708V8.593C9.31395 10.1376 8.06708 11.4126 6.50003 11.4413C4.93299 11.4126 3.68599 10.1376 3.71434 8.593V3.84708C3.68673 2.30296 4.93348 1.02873 6.50003 1C8.06658 1.02873 9.31334 2.30296 9.28573 3.84708Z" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
              <path d="M1.50101 11.804C1.09721 11.4924 0.513573 11.5625 0.197452 11.9605C-0.11868 12.3585 -0.0476017 12.9338 0.3562 13.2454L1.50101 11.804ZM12.6437 13.2454C13.0476 12.9338 13.1187 12.3585 12.8026 11.9605C12.4864 11.5625 11.9027 11.4924 11.499 11.804L12.6437 13.2454ZM7.42855 14.4236C7.42855 13.9181 7.0128 13.5083 6.49999 13.5083C5.98717 13.5083 5.57142 13.9181 5.57142 14.4236H7.42855ZM5.57142 18.0846C5.57142 18.5901 5.98717 18.9999 6.49999 18.9999C7.0128 18.9999 7.42855 18.5901 7.42855 18.0846H5.57142ZM0.3562 13.2454C3.96489 16.03 9.03509 16.03 12.6437 13.2454L11.499 11.804C8.56277 14.0698 4.43721 14.0698 1.50101 11.804L0.3562 13.2454ZM5.57142 14.4236V18.0846H7.42855V14.4236H5.57142Z" stroke="currentColor"/>
            </svg>
            <svg class="navArrow" fill="none" height="5" viewBox="0 0 9 5" width="9" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.50258 3.7587L0.734061 0L0 0.731145L4.13555 4.85027C4.23241 4.94617 4.36343 5 4.5 5C4.63657 5 4.76759 4.94617 4.86445 4.85027L9 0.731145L8.27111 0.00514903L4.50258 3.7587Z" stroke="currentColor"/>
            </svg>
          </button>
          <button data-i18n="camera" id="navVideoCamera">
            <svg class="svgColorWB" fill="none" height="13" viewBox="0 0 18 13" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.44444 3.96154L1 2.26923V10.7308L5.44444 9.03846M16.1111 1H6.33333C5.8424 1 5.44444 1.37884 5.44444 1.84615V11.1538C5.44444 11.6212 5.8424 12 6.33333 12H16.1111C16.602 12 17 11.6212 17 11.1538V1.84615C17 1.37884 16.602 1 16.1111 1Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
            <svg class="navArrow" fill="none" height="5" viewBox="0 0 9 5" width="9" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.50258 3.7587L0.734061 0L0 0.731145L4.13555 4.85027C4.23241 4.94617 4.36343 5 4.5 5C4.63657 5 4.76759 4.94617 4.86445 4.85027L9 0.731145L8.27111 0.00514903L4.50258 3.7587Z" stroke="currentColor"/>
            </svg>
          </button>
        </div>
        <fieldset id="navMode">
          <legend data-i18n-text-content="mode">&nbsp;</legend>
          <div class="gridChildren4 gridRows2 navFieldsetInner">
            <button class="navButton navActiveButton" data-i18n="showWhiteboard" id="navModeWhiteboard">
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0H0V1.25H0.5V10.5H15.5V1.25H16V0ZM14.5 9.5H1.5V1.25H14.5V9.5Z" stroke="currentColor"/>
                <path d="M8.5 11H7.5V16H8.5V11Z" stroke="currentColor"/>
                <path d="M3.54004 16H4.54004L6.63085 11H5.63085L3.54004 16Z" stroke="currentColor"/>
                <path d="M9.36914 11L11.46 16H12.46L10.3691 11H9.36914Z" stroke="currentColor"/>
              </svg>
            </button>
            <button class="navButton" data-i18n="showVideo" id="navModeVideo">
              <svg fill="none" height="16" viewBox="0 0 17 16" width="17" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1.12703L2.50004 1.12695C2.10221 1.12695 1.00002 1.12703 1.00002 1.12703C1.00002 1.12703 1.00004 2.22913 1.00004 2.62695V10.127C1.00004 10.5248 1 11.627 1 11.627C1 11.627 2.10221 11.627 2.50004 11.627H14.5C14.8979 11.627 16 11.627 16 11.627C16 11.627 16 10.5248 16 10.127V1.12703Z" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M5.5 14.627H11.5" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M8.5 11.627V14.627" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.7461 6.55127C10.8417 6.55318 10.9352 6.57357 11.0195 6.61182L11.1006 6.65576C11.5799 6.96575 11.9708 7.38162 12.2402 7.86572C12.5101 8.35062 12.6506 8.89026 12.6504 9.43701V9.43799C12.6503 9.48844 12.629 9.54037 12.5859 9.58154C12.542 9.62341 12.4784 9.6499 12.4092 9.6499H4.59082C4.52164 9.6499 4.45802 9.62341 4.41406 9.58154C4.37103 9.54037 4.34969 9.48844 4.34961 9.43799V9.43701C4.34938 8.89026 4.48991 8.35062 4.75977 7.86572C5.02921 7.38162 5.42007 6.96575 5.89941 6.65576C6.00322 6.5902 6.1265 6.55381 6.25391 6.55127C6.38121 6.54876 6.50547 6.58061 6.6123 6.64209L6.61621 6.64404C7.18815 6.9648 7.83853 7.1333 8.5 7.1333C9.16147 7.1333 9.81185 6.9648 10.3838 6.64404L10.3877 6.64209C10.4945 6.58061 10.6188 6.54876 10.7461 6.55127Z" stroke="currentColor" stroke-width="0.7"/>
                <path d="M8.5 2.34961C9.56553 2.34961 10.4002 3.16843 10.4004 4.14258C10.4004 5.11685 9.56563 5.93555 8.5 5.93555C7.43437 5.93555 6.59961 5.11685 6.59961 4.14258C6.59977 3.16843 7.43447 2.34961 8.5 2.34961Z" stroke="currentColor" stroke-width="0.7"/>
              </svg>
            </button>
          </div>
        </fieldset>
        <fieldset id="navOptions">
          <legend data-i18n-text-content="options">&nbsp;</legend>
          <div class="gridChildren4 gridRows2 navFieldsetInner">
            <button class="navButton" data-device="shareScreen" data-i18n="shareScreen" id="navOptionsShareScreen">
              <svg fill="none" height="14" viewBox="0 0 16 14" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.70615 0.986328H2.35321C1.97878 0.986328 0.941428 0.986395 0.941428 0.986395C0.941428 0.986395 0.941443 1.95073 0.941443 2.29883V8.86133C0.941443 9.20942 0.941406 10.1738 0.941406 10.1738C0.941406 10.1738 1.97878 10.1738 2.35321 10.1738H13.6473C14.0217 10.1738 15.0591 10.1738 15.0591 10.1738C15.0591 10.1738 15.0591 9.20942 15.0591 8.86133V6.89258" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M5.17578 12.7988H10.8228" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M8 10.1738V12.7988" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5293 4.26758L15.0587 0.986328" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5293 0.986328H15.0587V4.26758" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="navButton" data-i18n="photoOfWhiteboard" id="navOptionsWhiteboardRecording">
              <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.27276 0.5H0.5V5.27236M0.5 9.72724V14.5H5.27236M14.5 9.72724V14.5H9.72724M14.5 5.27276V0.5H9.72724" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="navButton" data-i18n="audioRecording" id="navOptionsAudioRecording">
              <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0488 7.5C12.0488 8.46649 11.2653 9.25 10.2988 9.25C9.33234 9.25 8.54883 8.46649 8.54883 7.5C8.54883 6.53351 9.33234 5.75 10.2988 5.75C11.2653 5.75 12.0488 6.53351 12.0488 7.5Z" stroke="currentColor"/>
                <path d="M6.45117 7.5C6.45117 8.46649 5.66767 9.25 4.70117 9.25C3.73467 9.25 2.95117 8.46649 2.95117 7.5C2.95117 6.53351 3.73467 5.75 4.70117 5.75C5.66767 5.75 6.45117 6.53351 6.45117 7.5Z" stroke="currentColor"/>
                <path d="M4.70117 9.25H10.3012" stroke="currentColor" stroke-linecap="round"/>
                <path d="M0.5 7.5C0.5 4.20017 0.5 2.55025 1.52513 1.52513C2.55025 0.5 4.20017 0.5 7.5 0.5C10.7998 0.5 12.4498 0.5 13.4748 1.52513C14.5 2.55025 14.5 4.20017 14.5 7.5C14.5 10.7998 14.5 12.4498 13.4748 13.4748C12.4498 14.5 10.7998 14.5 7.5 14.5C4.20017 14.5 2.55025 14.5 1.52513 13.4748C0.5 12.4498 0.5 10.7998 0.5 7.5Z" stroke="currentColor"/>
              </svg>
            </button>
            <button class="navButton" data-i18n="videoRecording" id="navOptionsVideoRecording">
              <svg fill="none" height="15" viewBox="0 0 17 15" width="17" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8996 5.13181L16.1496 3.55286V11.4476L11.8996 9.86865M1.69961 2.36865H11.0496C11.5191 2.36865 11.8996 2.72212 11.8996 3.15813V11.8423C11.8996 12.2784 11.5191 12.6318 11.0496 12.6318H1.69961C1.23017 12.6318 0.849609 12.2784 0.849609 11.8423V3.15813C0.849609 2.72212 1.23017 2.36865 1.69961 2.36865Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </fieldset>
      </div>
      <div class="show" id="navWhiteboard">
        <fieldset id="navDraw">
          <legend data-i18n-text-content="draw">&nbsp;</legend>
          <div class="gridChildren4 gridRows2 navFieldsetInner">
            <button class="navButton navActiveButton" data-i18n="activatePencil" id="navDrawPencil">
              <svg class="svgColorWB" fill="none" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.05756 17.0215L2.08008 18.7529L3.97807 13.9421M7.05756 17.0215L3.97807 13.9421M7.05756 17.0215L18.6266 5.45255M3.97807 13.9421L15.5471 2.37306M18.6266 5.45255L20.2926 3.78653C20.6831 3.396 20.6831 2.76284 20.2926 2.37231L18.6273 0.707035C18.2368 0.316511 17.6036 0.316511 17.2131 0.707035L15.5471 2.37306M18.6266 5.45255L15.5471 2.37306" stroke="currentColor" stroke-width="0.8"/>
                <path class="svgFillWB" d="M2.95312 18.126L3.25312 17.376L3.70312 17.826L2.95312 18.126Z" fill="black" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="hidden navButton"></button>
            <button class="navButton" data-i18n="colorPicker" id="navDrawColorPicker">
              <svg fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#navDrawColorPickerClipPath)">
                  <g transform="matrix(0 0.007 -0.0068427 0 6.8427 7)">
                    <foreignObject height="2292.28" width="2292.28" x="-1146.14" y="-1146.14">
                      <div class="navDrawColorPicker" xmlns="http://www.w3.org/1999/xhtml"></div>
                    </foreignObject>
                  </g>
                </g>
                <ellipse cx="6.8427" cy="7" rx="6.8427" ry="7"/>
                <defs>
                  <clipPath id="navDrawColorPickerClipPath">
                    <ellipse cx="6.8427" cy="7" rx="6.8427" ry="7"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button class="navButton" data-i18n="lineWidth" id="navDrawLineWidth">
              <svg class="svgColorWB" fill="none" height="21" viewBox="0 0 14 21" width="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.25 3.25V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M11 3.25V17.5" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </fieldset>
        <fieldset id="navText">
          <legend data-i18n-text-content="text">&nbsp;</legend>
          <div class="gridRows2 navFieldsetInner">
            <button class="navButton navButton3 span3" data-i18n="fontFamily" id="navTextFamily">
              <span class="spinner spinnerTiny"></span>
            </button>
            <button class="navButton navButton2 span2" data-i18n="fontSize" id="navTextSize">
              <svg class="svgFillWB" fill="none" height="14" viewBox="0 0 20 14" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.44 0V1.48H5.64V13.94H3.82V1.48H0V0H9.44Z"/>
                <path d="M19.1184 9.83365L17.5375 11.736V2.26187L19.1184 4.16417C19.2178 4.28268 19.3443 4.34505 19.4663 4.34505C19.6153 4.34505 19.7644 4.25773 19.8683 4.08933C20.0625 3.78371 20.0399 3.31593 19.8141 3.04774L17.4427 0.197407C17.1852 -0.0707857 16.8148 -0.0707857 16.5348 0.228593L14.1859 3.04774C13.9646 3.31593 13.942 3.77747 14.1317 4.08933C14.326 4.39494 14.6602 4.42613 14.8861 4.16417L16.467 2.26187V11.736L14.8861 9.83365C14.6647 9.56546 14.326 9.59664 14.1317 9.90849C13.9375 10.2141 13.9601 10.6819 14.1859 10.9501L16.5573 13.8004C16.6838 13.9314 16.8329 14 16.991 14C17.1536 14 17.3207 13.9252 17.4652 13.7692L19.8141 10.9501C20.0354 10.6819 20.058 10.2203 19.8683 9.90849C19.6785 9.59664 19.3398 9.56546 19.1184 9.83365Z"/>
              </svg>
              <span id="navTextSizeCurrent">20</span>
            </button>
            <button class="navButton" data-i18n="colorPicker" id="navTextColorPicker">
              <svg fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#navTextColorPickerClipPath)">
                  <g transform="matrix(0 0.007 -0.0068427 0 6.8427 7)">
                    <foreignObject height="2292.28" width="2292.28" x="-1146.14" y="-1146.14">
                      <div class="navDrawColorPicker" xmlns="http://www.w3.org/1999/xhtml"></div>
                    </foreignObject>
                  </g>
                </g>
                <ellipse cx="6.8427" cy="7" rx="6.8427" ry="7"/>
                <defs>
                  <clipPath id="navTextColorPickerClipPath">
                    <ellipse cx="6.8427" cy="7" rx="6.8427" ry="7"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </fieldset>
        <fieldset id="navInsert">
          <legend data-i18n-text-content="insert">&nbsp;</legend>
          <div class="gridChildren4 gridRows2 navFieldsetInner">
            <button class="navButton" data-i18n="text" id="navInsertText">
              <svg class="svgColorWB" fill="none" height="17" viewBox="0 0 18 17" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.60156 6.25H11.4017" stroke="currentColor" stroke-linecap="round"/>
                <path d="M9 10.7501V6.25" stroke="currentColor" stroke-linecap="round"/>
                <path d="M4.20008 2.49999C4.20008 3.32841 3.48372 3.99998 2.60004 3.99998C1.71636 3.99998 1 3.32841 1 2.49999C1 1.67157 1.71636 1 2.60004 1C3.48372 1 4.20008 1.67157 4.20008 2.49999Z" stroke="currentColor"/>
                <path d="M4.20008 14.5C4.20008 15.3284 3.48372 16 2.60004 16C1.71636 16 1 15.3284 1 14.5C1 13.6715 1.71636 13 2.60004 13C3.48372 13 4.20008 13.6715 4.20008 14.5Z" stroke="currentColor"/>
                <path d="M17.0009 2.49999C17.0009 3.32841 16.2845 3.99998 15.4008 3.99998C14.5171 3.99998 13.8008 3.32841 13.8008 2.49999C13.8008 1.67157 14.5171 1 15.4008 1C16.2845 1 17.0009 1.67157 17.0009 2.49999Z" stroke="currentColor"/>
                <path d="M17.0009 14.5C17.0009 15.3284 16.2845 16 15.4008 16C14.5171 16 13.8008 15.3284 13.8008 14.5C13.8008 13.6715 14.5171 13 15.4008 13C16.2845 13 17.0009 13.6715 17.0009 14.5Z" stroke="currentColor"/>
                <path d="M4.20117 14.5H13.8014" stroke="currentColor" stroke-linecap="round"/>
                <path d="M13.8014 2.5H4.20117" stroke="currentColor" stroke-linecap="round"/>
                <path d="M15.4004 12.9999V4" stroke="currentColor" stroke-linecap="round"/>
                <path d="M2.59961 4V12.9999" stroke="currentColor" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="hidden navButton"></button>
            <button class="navButton" id="navInsertPDF" title="PDF">
              <svg fill="none" height="16" viewBox="0 0 12 16" width="12" xmlns="http://www.w3.org/2000/svg">
                <path class="svgFillWB" d="M9.52083 6H1.72917C1.60244 6 1.5 6.16762 1.5 6.375C1.5 6.58237 1.60244 6.75 1.72917 6.75H9.52083C9.64756 6.75 9.75 6.58237 9.75 6.375C9.75 6.16762 9.64756 6 9.52083 6Z"/>
                <path class="svgFillWB" d="M9.52083 4.125H1.72917C1.60244 4.125 1.5 4.29262 1.5 4.5C1.5 4.70737 1.60244 4.875 1.72917 4.875H9.52083C9.64756 4.875 9.75 4.70737 9.75 4.5C9.75 4.29262 9.64756 4.125 9.52083 4.125Z"/>
                <path class="svgFillWB" d="M9.52083 9.75H1.72917C1.60244 9.75 1.5 9.91762 1.5 10.125C1.5 10.3324 1.60244 10.5 1.72917 10.5H9.52083C9.64756 10.5 9.75 10.3324 9.75 10.125C9.75 9.91762 9.64756 9.75 9.52083 9.75Z"/>
                <path class="svgFillWB" d="M9.52083 11.625H1.72917C1.60244 11.625 1.5 11.7926 1.5 12C1.5 12.2074 1.60244 12.375 1.72917 12.375H9.52083C9.64756 12.375 9.75 12.2074 9.75 12C9.75 11.7926 9.64756 11.625 9.52083 11.625Z"/>
                <path class="svgFillWB" d="M9.52083 13.5H1.72917C1.60244 13.5 1.5 13.6676 1.5 13.875C1.5 14.0824 1.60244 14.25 1.72917 14.25H9.52083C9.64756 14.25 9.75 14.0824 9.75 13.875C9.75 13.6676 9.64756 13.5 9.52083 13.5Z"/>
                <path class="svgFillWB" d="M9.52083 7.875H1.72917C1.60244 7.875 1.5 8.04262 1.5 8.25C1.5 8.45737 1.60244 8.625 1.72917 8.625H9.52083C9.64756 8.625 9.75 8.45737 9.75 8.25C9.75 8.04262 9.64756 7.875 9.52083 7.875Z"/>
                <path class="svgFillWB" d="M1.70833 3H5.04167C5.15687 3 5.25 2.83237 5.25 2.625C5.25 2.41762 5.15687 2.25 5.04167 2.25H1.70833C1.59313 2.25 1.5 2.41762 1.5 2.625C1.5 2.83237 1.59313 3 1.70833 3Z"/>
                <rect class="svgColorWB" height="14.9375" stroke="currentColor" width="10.25" x="0.5" y="0.5"/>
              </svg>
            </button>
            <button class="navButton" data-i18n="image" id="navInsertImage">
              <svg class="svgFillWB" fill="none" height="12" viewBox="0 0 16 12" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0H1C0.4505 0 0 0.400356 0 0.888692V11.1113C0 11.5996 0.45 12 1 12H15C15.5495 12 16 11.5996 16 11.1113V0.888692C16 0.400356 15.5495 0 15 0ZM15 11.1113H1V8.49322L5.0135 5.03666L9.151 8.70918C9.3215 8.89314 9.625 8.86959 9.8405 8.72473L11.6665 7.25572L14.96 10.2604C14.9725 10.2715 14.9865 10.2799 15 10.2893V11.1113ZM15 9.02422L12.062 6.35237C11.8835 6.19596 11.6045 6.1804 11.4065 6.31415L9.5225 7.7725L5.3825 4.1333C5.294 4.03821 5.1665 3.98045 5.028 3.97201C4.8905 3.96756 4.7545 4.00755 4.6535 4.09198L0.999 7.25217V0.888247H14.999V9.02377L15 9.02422ZM11.5 4.44657C12.051 4.44657 12.4975 4.04932 12.4975 3.5601C12.4975 3.07087 12.0515 2.67363 11.5 2.67363C10.9485 2.67363 10.5025 3.07087 10.5025 3.5601C10.5025 4.04932 10.9485 4.44657 11.5 4.44657Z"/>
              </svg>
            </button>
            <input accept=".pdf" class="none" id="navInsertPDFInput" multiple type="file">
            <input accept="image/*" class="none" id="navInsertImageInput" multiple type="file">
          </div>
        </fieldset>
      </div>
    </nav>
  </div>
  <main>
    <div id="content">
      <div class="none" id="videoRemoteOuter">
        <video autoplay id="videoRemote" playsinline></video>
      </div>
      <div id="wbOuter">
        <div id="wbControl">
          <div id="wbControlLeft">
            <button data-i18n="back" id="wbControlBack">
              <svg class="svgFillWB" height="12" viewBox="0 0 16 12" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.1539 4.65661L0.576946 5.23356L0 4.65661L0.576946 4.07966L1.1539 4.65661ZM15.0247 11.1841C15.0247 11.6347 14.6594 12 14.2088 12C13.7582 12 13.3929 11.6347 13.3929 11.1841H15.0247ZM4.6566 9.31322L0.576946 5.23356L1.73085 4.07966L5.81051 8.15933L4.6566 9.31322ZM0.576946 4.07966L4.6566 0L5.81051 1.15391L1.73085 5.23356L0.576946 4.07966ZM1.1539 3.84068H9.31322V5.47255H1.1539V3.84068ZM15.0247 9.5522V11.1841H13.3929V9.5522H15.0247ZM9.31322 3.84068C12.4676 3.84068 15.0247 6.39781 15.0247 9.5522H13.3929C13.3929 7.29909 11.5663 5.47255 9.31322 5.47255V3.84068Z" fill-rule="evenodd" stroke="currentColor"/>
              </svg>
            </button>
            <button data-i18n="forward" id="wbControlForward">
              <svg class="svgFillWB" height="12" viewBox="0 0 16 12" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0063 4.65661L14.5832 5.23356L15.1602 4.65661L14.5832 4.07966L14.0063 4.65661ZM0.135415 11.1841C0.135415 11.6347 0.500708 12 0.951347 12C1.40199 12 1.76728 11.6347 1.76728 11.1841H0.135415ZM10.5036 9.31322L14.5832 5.23356L13.4293 4.07966L9.34964 8.15933L10.5036 9.31322ZM14.5832 4.07966L10.5036 0L9.34964 1.15391L13.4293 5.23356L14.5832 4.07966ZM14.0063 3.84068H5.84694V5.47255H14.0063V3.84068ZM0.135415 9.5522V11.1841H1.76728V9.5522H0.135415ZM5.84694 3.84068C2.69254 3.84068 0.135415 6.39781 0.135415 9.5522H1.76728C1.76728 7.29909 3.59382 5.47255 5.84694 5.47255V3.84068Z" fill-rule="evenodd" stroke="currentColor"/>
              </svg>
            </button>
          </div>
          <div id="wbControlMiddle"></div>
          <div id="wbControlRight"></div>
        </div>
        <div id="wbInner">
          <canvas id="whiteboard"></canvas>
          <svg class="none" height="16" id="wbPartnerCursor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 43 65" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.96714 2.36699 L0.98128 59.18699 L14.40714 46.41300 L20.94994 62.61699 L28.92624 59.39649 L22.38344 43.19249 L40.89244 43.08251 Z" fill="red" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
          </svg>
        </div>
      </div>
    </div>
    <div id="media">
      <div data-status="closed" data-style-id="videoLocalOuterStyle" id="videoLocalOuter">
        <video autoplay id="videoLocal" muted playsinline></video>
      </div>
      <div class="none" id="videoOthersOuter"></div>
      <div id="chatOuter">
        <div id="chatAll">
          <div id="chatOldOuter">
            <div id="chatOld"></div>
          </div>
          <div id="chatNewOuter">
            <textarea id="chatNew" placeholder="Chat" rows="1"></textarea>
            <button data-i18n="sendMessage" id="chatSendMessage">
              <svg class="svgColorWB" fill="none" height="11" viewBox="0 0 12 11" width="12" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.73716 5.50149H2.11845M2.01588 5.96708L1.41802 7.72001C1.09057 8.68006 0.926852 9.16008 1.04435 9.45566C1.14638 9.7124 1.36552 9.907 1.63593 9.98112C1.94731 10.0664 2.41762 9.85865 3.35824 9.44322L9.38849 6.77971C10.3066 6.37416 10.7657 6.17144 10.9075 5.88975C11.0308 5.64504 11.0308 5.35787 10.9075 5.11316C10.7657 4.83154 10.3066 4.62876 9.38849 4.22323L3.34784 1.55516C2.41005 1.14095 1.94117 0.933846 1.63009 1.01881C1.35994 1.09259 1.14082 1.28669 1.03843 1.54293C0.920533 1.83798 1.08251 2.31697 1.40646 3.27494L2.01704 5.08057C2.07267 5.24509 2.1005 5.32738 2.11148 5.41149C2.12122 5.48618 2.12112 5.56176 2.11118 5.6364C2.09998 5.7205 2.07195 5.80267 2.01588 5.96708Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="chatOuterDummy">
        <div class="hidden" id="chatAllDummy">
          <div id="chatOldOuterDummy">
            <div id="chatOldDummy"></div>
          </div>
          <div id="chatNewOuterDummy">
            <textarea id="chatNewDummy" rows="1"></textarea>
          </div>
        </div>
      </div>
      <div id="buttonsOuter">
        <button class="none" data-i18n-text-content="createMeeting" id="createMeeting"></button>
        <div class="none" id="inviteOuter">
          <input id="inviteLink" readonly type="text">
          <button data-i18n-text-content="copyLink" id="inviteCopy"></button>
          <div id="inviteQR"></div>
        </div>
        <br><br>
      </div>
    </div>
  </main>
  <div id="notificationsOuter"></div>
  <script defer src="/js/html2canvas.min.js"></script>
  <script defer src="/js/qrCodeGenerator.js"></script>
  <script defer src="/js/index.js"></script>
</body>
</html>