import PropTypes from "prop-types";
import Swal from "sweetalert2";
import styled from "styled-components";

const StyledConfirmButton = styled.button`
  background-color: #FF69A9;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #FF99C8;
  }
`;

const StyledCancelButton = styled.button`
  background-color: white;
  color: #b3b3b3;
  border: 1px solid #B3B3B3;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    color: white;
  }
`;

const AlertDialog = ({
  mode = "alert",
  title,
  text,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => {
  const handleOpenDialog = () => {
    const confirmButtonClass = "custom-confirm-button";
    const cancelButtonClass = "custom-cancel-button";
    const successIconClass = "custom-success-icon";
    const warningIconClass = "custom-warning-icon";

    if (mode === "alert") {
      Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: confirmText,
        customClass: {
          confirmButton: confirmButtonClass,
          icon: successIconClass,
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm?.();
        }
      });
    } else if (mode === "confirm") {
      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        customClass: {
          confirmButton: confirmButtonClass,
          cancelButton: cancelButtonClass,
          icon: warningIconClass,
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm?.();
        } else if (result.isDismissed && onCancel) {
          onCancel?.();
        }
      });
    }

    // 강제로 스타일을 덮어쓰는 부분
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .${confirmButtonClass} {
        ${StyledConfirmButton.componentStyle.rules.join(" ")}
      }
      .${cancelButtonClass} {
        ${StyledCancelButton.componentStyle.rules.join(" ")}
        margin-left: 10px;
      }
      .${successIconClass} .swal2-success-ring {
        border-color: #FFE3F2 !important;
      }
      .${successIconClass} .swal2-success-line-tip,
      .${successIconClass} .swal2-success-line-long {
        background-color: #FF69A9 !important;
      }
      .${successIconClass} .swal2-success-circle {
        stroke: #FF69A9 !important;
      }
      .${warningIconClass} .swal2-warning-circular-line {
        stroke: #FF69A9 !important;
      }
      .${warningIconClass} .swal2-warning-body {
        background-color: #FF69A9 !important; 
      }
      .${warningIconClass} .swal2-warning-dot {
        background-color: #FF69A9 !important;
      }
    `;
    document.head.appendChild(styleSheet);
  };

  return (
    <button onClick={handleOpenDialog}>
      Open {mode.charAt(0).toUpperCase() + mode.slice(1)} Dialog
    </button>
  );
};

AlertDialog.propTypes = {
  mode: PropTypes.oneOf(["alert", "confirm"]).isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AlertDialog;