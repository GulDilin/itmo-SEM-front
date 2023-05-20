import {
  mdiAlert,
  mdiArchiveEyeOutline,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowUp,
  mdiCheck,
  mdiClose,
  mdiExclamation,
  mdiInformationOutline,
  mdiLoading,
  mdiMagnify,
  mdiMenuSwap,
  mdiMinus,
  mdiOpenInNew,
  mdiPlus,
} from '@mdi/js'

const icons = {
  SEARCH: mdiMagnify,
  CLOSE: mdiClose,
  CLEAR: mdiClose,
  LINK_TO: mdiOpenInNew,
  LOADING: mdiLoading,
  SORT_UNDEFINED: mdiMenuSwap,

  ARROW_DOWN: mdiArrowDown,
  ARROW_UP: mdiArrowUp,
  ARROW_LEFT: mdiArrowLeft,
  ARROW_RIGHT: mdiArrowRight,

  SUCCESS: mdiCheck,
  INFO: mdiInformationOutline,
  WARNING: mdiExclamation,
  ERROR: mdiAlert,
  MORE: mdiArchiveEyeOutline,

  MINUS: mdiMinus,
  PLUS: mdiPlus,
}

export default icons
