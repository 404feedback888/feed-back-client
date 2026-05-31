const API_BASE_URL = 'https://feed-back-server.onrender.com';

async function loadFeedbacks() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/messages/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const tableBody = document.getElementById('feedbackTable');

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Không có nhận xét nào</td></tr>';
            return;
        }

        tableBody.innerHTML = data.map((item, index) => `
            <tr>
                <td>${item.information}</td>
                <td>${item.content}</td>
                <td>
                    <button onclick="deleteFeedback('${item.createdAt}', ${index})" style="background-color: #ff4444; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">
                        Xóa
                    </button>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Lỗi load feedback:', error);
        const tableBody = document.getElementById('feedbackTable');
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Có lỗi khi tải dữ liệu</td></tr>';
    }
}

async function deleteFeedback(createdAt, index) {
    if (!confirm('Bạn chắc chắn muốn xóa nhận xét này?')) {
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/messages/delete?createdAt=${encodeURIComponent(createdAt)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            alert('Xóa nhận xét thành công!');
            loadFeedbacks();
        } else {
            alert('Không thể xóa nhận xét. Vui lòng thử lại.');
        }

    } catch (error) {
        console.error('Lỗi xóa feedback:', error);
        alert('Có lỗi khi xóa nhận xét.');
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

loadFeedbacks();