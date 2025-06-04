export async function logout() {
    try {

        const response = await fetch('http://localhost:8081/api/admin/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }


        return true;
    } catch (error) {
        console.error('Logout API error:', error);
        return false;
    }
}