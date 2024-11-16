import alertify from 'alertifyjs';

alertify.set('notifier', 'position', 'top-right');
alertify.set('notifier', 'delay', 3);

export const handleSuccess = (message = 'Success!') => {
    alertify.success(message);
};

export const handleFailure = (message = 'An error occurred!') => {
    alertify.error(message);
};
