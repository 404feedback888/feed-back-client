const API_BASE_URL = 'https://feed-back-server.onrender.com';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const feedback = document.getElementById('feedback').value;
            const information = document.getElementById('information').value;

            if (!feedback.trim() || !information.trim()) {
                alert('Vui lòng điền đầy đủ thông tin trước khi gửi phản hồi.');
                return;
            }

            const data = {
                content: feedback,
                information: information
            };

            fetch(`${API_BASE_URL}/messages/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                /*
                .then(response => {
                    if (response.ok) {
                        alert('Gửi nhận xét thành công!');
                        document.getElementById('feedbackForm').reset();
                        window.location.href = 'send.html';
                    } else {
                        alert('Có lỗi xảy ra. Vui lòng thử lại.');
                    }
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                    alert('Không thể kết nối đến máy chủ.');
                });
                */
        });
    }
});
