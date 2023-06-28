import Swal from 'sweetalert2';

const Alert = (icon, text, onSuccess) => {
  Swal.fire({
    icon: icon,
    iconColor: 'var(--color-dark-green)',
    width: 400,
    text: text,
    confirmButtonColor: 'var(--color-dark-green)',
    confirmButtonText: '확인',
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  });
};

const confirmCancelAlert = (icon, text, onSuccess) => {
  Swal.fire({
    icon: icon,
    iconColor: 'var(--color-dark-green)',
    text: text,
    width: 400,
    confirmButtonColor: 'var(--color-dark-green)',
    confirmButtonText: '확인',
    cancelButtonColor: 'var(--color-red)',
    cancelButtonText: '취소',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  });
};

export { Alert, confirmCancelAlert };
