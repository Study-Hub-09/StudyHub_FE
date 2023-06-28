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

export { Alert };
