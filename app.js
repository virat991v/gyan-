// In-memory database
let users = [];
let items = [];
let currentUser = null;
let nextUserId = 1;
let nextItemId = 1;

// Initialize app
function init() {
    loadFromMemory();
    checkAuth();
    renderItems();
    updatePostItemVisibility();
}

// Load data from in-memory storage (simulating persistence)
function loadFromMemory() {
    // Initialize with sample data if empty
    if (users.length === 0) {
        users = [
            {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                password: 'test123',
                bio: 'Books lover and engineering student',
                createdAt: '2024-11-10'
            },
            {
                id: 2,
                username: 'johndoe',
                email: 'john@example.com',
                password: 'john123',
                bio: 'CSE student, selling course materials',
                createdAt: '2024-11-10'
            },
            {
                id: 3,
                username: 'priya',
                email: 'priya@example.com',
                password: 'priya123',
                bio: 'Final year student, donated notes',
                createdAt: '2024-11-10'
            }
        ];
        nextUserId = 4;
    }

    if (items.length === 0) {
        items = [
            {
                id: 1,
                title: 'Introduction to Python Programming',
                category: 'textbooks',
                subject: 'Computer Science',
                course: 'CSE-101',
                transactionType: 'sell',
                price: 299,
                description: 'Complete Python guide with examples and exercises. Perfect for beginners.',
                sellerId: 1,
                sellerName: 'testuser',
                image: '',
                createdAt: '2024-11-10',
                favorites: 0
            },
            {
                id: 2,
                title: 'Data Structures and Algorithms Notes',
                category: 'notes',
                subject: 'Computer Science',
                course: 'CSE-201',
                transactionType: 'donate',
                price: 0,
                description: 'Comprehensive handwritten notes on DSA with detailed explanations.',
                sellerId: 2,
                sellerName: 'johndoe',
                image: '',
                createdAt: '2024-11-12',
                favorites: 0
            },
            {
                id: 3,
                title: 'Mathematics Textbook - Calculus',
                category: 'textbooks',
                subject: 'Mathematics',
                course: 'MATH-101',
                transactionType: 'sell',
                price: 199,
                description: 'Advanced calculus with solved problems. Excellent condition.',
                sellerId: 3,
                sellerName: 'priya',
                image: '',
                createdAt: '2024-11-11',
                favorites: 0
            },
            {
                id: 4,
                title: 'Physics Lab Manual',
                category: 'guides',
                subject: 'Physics',
                course: 'PHY-101',
                transactionType: 'donate',
                price: 0,
                description: 'Complete lab manual with observations and practical notes.',
                sellerId: 1,
                sellerName: 'testuser',
                image: '',
                createdAt: '2024-11-09',
                favorites: 0
            },
            {
                id: 5,
                title: 'Engineering Graphics Book',
                category: 'textbooks',
                subject: 'Engineering',
                course: 'ENG-102',
                transactionType: 'sell',
                price: 150,
                description: 'Standard engineering graphics textbook with all chapters.',
                sellerId: 2,
                sellerName: 'johndoe',
                image: '',
                createdAt: '2024-11-08',
                favorites: 0
            },
            {
                id: 6,
                title: 'Chemistry Practical Notes',
                category: 'notes',
                subject: 'Chemistry',
                course: 'CHEM-101',
                transactionType: 'donate',
                price: 0,
                description: 'Well-organized practical notes with all experiments.',
                sellerId: 3,
                sellerName: 'priya',
                image: '',
                createdAt: '2024-11-07',
                favorites: 0
            },
            {
                id: 7,
                title: 'Operating Systems by Galvin',
                category: 'textbooks',
                subject: 'Computer Science',
                course: 'CSE-301',
                transactionType: 'sell',
                price: 450,
                description: 'Latest edition of the classic OS textbook. Like new.',
                sellerId: 1,
                sellerName: 'testuser',
                image: '',
                createdAt: '2024-11-06',
                favorites: 0
            },
            {
                id: 8,
                title: 'Database Management System Notes',
                category: 'notes',
                subject: 'Computer Science',
                course: 'CSE-302',
                transactionType: 'sell',
                price: 99,
                description: 'Complete DBMS notes covering all topics with examples.',
                sellerId: 2,
                sellerName: 'johndoe',
                image: '',
                createdAt: '2024-11-05',
                favorites: 0
            },
            {
                id: 9,
                title: 'Digital Electronics Guide',
                category: 'guides',
                subject: 'Electronics',
                course: 'ECE-201',
                transactionType: 'donate',
                price: 0,
                description: 'Comprehensive guide for digital electronics with circuit diagrams.',
                sellerId: 3,
                sellerName: 'priya',
                image: '',
                createdAt: '2024-11-04',
                favorites: 0
            },
            {
                id: 10,
                title: 'Scientific Calculator',
                category: 'tools',
                subject: 'General',
                course: 'ALL',
                transactionType: 'sell',
                price: 350,
                description: 'Casio FX-991EX scientific calculator. Barely used.',
                sellerId: 1,
                sellerName: 'testuser',
                image: '',
                createdAt: '2024-11-03',
                favorites: 0
            },
            {
                id: 11,
                title: 'Linear Algebra Lecture Notes',
                category: 'notes',
                subject: 'Mathematics',
                course: 'MATH-201',
                transactionType: 'donate',
                price: 0,
                description: 'Complete lecture notes from Prof. Sharma class.',
                sellerId: 2,
                sellerName: 'johndoe',
                image: '',
                createdAt: '2024-11-02',
                favorites: 0
            },
            {
                id: 12,
                title: 'Computer Networks Book',
                category: 'textbooks',
                subject: 'Computer Science',
                course: 'CSE-401',
                transactionType: 'sell',
                price: 399,
                description: 'Tanenbaum Computer Networks book. Great condition.',
                sellerId: 3,
                sellerName: 'priya',
                image: '',
                createdAt: '2024-11-01',
                favorites: 0
            },
            {
                id: 13,
                title: 'Machine Learning Study Materials',
                category: 'notes',
                subject: 'Computer Science',
                course: 'CSE-501',
                transactionType: 'sell',
                price: 199,
                description: 'Comprehensive ML notes with Python implementations.',
                sellerId: 1,
                sellerName: 'testuser',
                image: '',
                createdAt: '2024-10-31',
                favorites: 0
            },
            {
                id: 14,
                title: 'Drawing Tools Set',
                category: 'tools',
                subject: 'Engineering',
                course: 'ENG-102',
                transactionType: 'sell',
                price: 250,
                description: 'Complete drawing instruments set including compass and ruler.',
                sellerId: 2,
                sellerName: 'johndoe',
                image: '',
                createdAt: '2024-10-30',
                favorites: 0
            },
            {
                id: 15,
                title: 'Microprocessor Programming Guide',
                category: 'guides',
                subject: 'Computer Science',
                course: 'CSE-203',
                transactionType: 'donate',
                price: 0,
                description: 'Step-by-step guide for 8085 and 8086 programming.',
                sellerId: 3,
                sellerName: 'priya',
                image: '',
                createdAt: '2024-10-29',
                favorites: 0
            }
        ];
        nextItemId = 16;
    }
}

// Check if user is authenticated
function checkAuth() {
    // Simulating session check (in real app would be JWT/token)
    const authData = getStoredAuthData();
    if (authData && authData.userId) {
        const user = users.find(u => u.id === authData.userId);
        if (user) {
            currentUser = user;
            updateUIForLoggedInUser();
        }
    }
}

// Get stored auth data from memory variable
let authStorage = null;

function getStoredAuthData() {
    return authStorage;
}

function setStoredAuthData(data) {
    authStorage = data;
}

function clearStoredAuthData() {
    authStorage = null;
}

// Update UI when user is logged in
function updateUIForLoggedInUser() {
    document.getElementById('authButtons').classList.add('hidden');
    document.getElementById('userDisplay').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.username + ' (ID: ' + currentUser.id + ')';
}

// Update UI when user is logged out
function updateUIForLoggedOutUser() {
    document.getElementById('authButtons').classList.remove('hidden');
    document.getElementById('userDisplay').classList.add('hidden');
}

// Show auth modal
function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
    
    modal.classList.add('active');
}

// Close auth modal
function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

// Login
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        setStoredAuthData({ userId: user.id, token: 'fake-jwt-token-' + user.id });
        updateUIForLoggedInUser();
        closeAuthModal();
        showNotification('Login successful! Welcome back, ' + user.username, 'success');
        updatePostItemVisibility();
        renderItems();
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Signup
function signup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const bio = document.getElementById('signupBio').value;
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showNotification('Username already taken', 'error');
        return;
    }
    
    const newUser = {
        id: nextUserId++,
        username,
        email,
        password,
        bio: bio || 'New member of Gyan Sahitya',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    currentUser = newUser;
    setStoredAuthData({ userId: newUser.id, token: 'fake-jwt-token-' + newUser.id });
    updateUIForLoggedInUser();
    closeAuthModal();
    showNotification('Account created successfully! Welcome, ' + username, 'success');
    updatePostItemVisibility();
}

// Logout
function logout() {
    currentUser = null;
    clearStoredAuthData();
    updateUIForLoggedOutUser();
    showNotification('Logged out successfully', 'success');
    updatePostItemVisibility();
    renderItems();
    
    // Clear the post item form
    document.getElementById('postItemForm').reset();
    document.getElementById('editItemId').value = '';
    document.getElementById('cancelEditBtn').classList.add('hidden');
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 50) {
        strengthBar.style.backgroundColor = 'var(--color-error)';
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = 'var(--color-warning)';
    } else {
        strengthBar.style.backgroundColor = 'var(--color-success)';
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + type;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Render items
function renderItems(filteredItems = null) {
    const grid = document.getElementById('itemsGrid');
    const itemsToRender = filteredItems || items;
    
    if (itemsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-secondary);"><p style="font-size: var(--font-size-lg);">No items found</p></div>';
        return;
    }
    
    grid.innerHTML = itemsToRender.map(item => `
        <div class="item-card fade-in">
            <div style="position: relative; padding-bottom: 60%; background-color: var(--color-secondary); border-radius: var(--radius-base) var(--radius-base) 0 0; overflow: hidden;">
                ${item.image ? `<img src="${item.image}" style="position: absolute; width: 100%; height: 100%; object-fit: cover;" alt="${item.title}">` : '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: var(--color-text-secondary);">📚</div>'}
            </div>
            <div style="padding: var(--space-16);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-8);">
                    <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--color-text); margin: 0; flex: 1;">${item.title}</h3>
                </div>
                <div style="display: flex; gap: var(--space-8); margin-bottom: var(--space-12);">
                    <span class="badge badge-primary">${item.category}</span>
                    ${item.transactionType === 'donate' ? '<span class="badge badge-success">Donate</span>' : `<span class="badge badge-warning">₹${item.price}</span>`}
                </div>
                <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-12); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-12);">
                    <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">By: ${item.sellerName}</span>
                    <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${item.course || 'N/A'}</span>
                </div>
                <div style="display: flex; gap: var(--space-8);">
                    <button onclick="viewItem(${item.id})" class="btn btn-primary" style="flex: 1; padding: var(--space-8);">View</button>
                    ${currentUser && currentUser.id === item.sellerId ? `
                        <button onclick="editItem(${item.id})" class="btn btn-secondary" style="padding: var(--space-8) var(--space-12);">Edit</button>
                        <button onclick="deleteItem(${item.id})" class="btn btn-secondary" style="padding: var(--space-8) var(--space-12); color: var(--color-error);">Delete</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const transactionType = document.getElementById('transactionFilter').value;
    const subject = document.getElementById('subjectFilter').value.toLowerCase();
    
    const filtered = items.filter(item => {
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            (item.course && item.course.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || item.category === category;
        const matchesTransaction = !transactionType || item.transactionType === transactionType;
        const matchesSubject = !subject || (item.subject && item.subject.toLowerCase().includes(subject));
        
        return matchesSearch && matchesCategory && matchesTransaction && matchesSubject;
    });
    
    renderItems(filtered);
}

// Toggle price field based on transaction type
function togglePriceField() {
    const transactionType = document.getElementById('itemTransactionType').value;
    const priceField = document.getElementById('priceField');
    const priceInput = document.getElementById('itemPrice');
    
    if (transactionType === 'donate') {
        priceField.style.display = 'none';
        priceInput.required = false;
        priceInput.value = 0;
    } else {
        priceField.style.display = 'block';
        priceInput.required = true;
    }
}

// Preview image before upload
function previewImage() {
    const file = document.getElementById('itemImage').files[0];
    const preview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Update post item visibility
function updatePostItemVisibility() {
    const form = document.getElementById('postItemForm');
    const authMessage = document.getElementById('postItemAuth');
    
    if (currentUser) {
        form.classList.remove('hidden');
        authMessage.classList.add('hidden');
    } else {
        form.classList.add('hidden');
        authMessage.classList.remove('hidden');
    }
}

// Post item form submission
document.getElementById('postItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to post items', 'error');
        return;
    }
    
    const editItemId = document.getElementById('editItemId').value;
    const title = document.getElementById('itemTitle').value;
    const category = document.getElementById('itemCategory').value;
    const subject = document.getElementById('itemSubject').value;
    const course = document.getElementById('itemCourse').value;
    const transactionType = document.getElementById('itemTransactionType').value;
    const price = transactionType === 'donate' ? 0 : parseInt(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value;
    const imageFile = document.getElementById('itemImage').files[0];
    
    if (!title || !category) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    const processItem = (imageData) => {
        if (editItemId) {
            // Update existing item
            const itemIndex = items.findIndex(i => i.id === parseInt(editItemId));
            if (itemIndex !== -1) {
                items[itemIndex] = {
                    ...items[itemIndex],
                    title,
                    category,
                    subject,
                    course,
                    transactionType,
                    price,
                    description,
                    image: imageData || items[itemIndex].image
                };
                showNotification('Item updated successfully!', 'success');
            }
        } else {
            // Create new item
            const newItem = {
                id: nextItemId++,
                title,
                category,
                subject,
                course,
                transactionType,
                price,
                description,
                sellerId: currentUser.id,
                sellerName: currentUser.username,
                image: imageData || '',
                createdAt: new Date().toISOString().split('T')[0],
                favorites: 0
            };
            items.unshift(newItem);
            showNotification('Item posted successfully!', 'success');
        }
        
        // Reset form
        document.getElementById('postItemForm').reset();
        document.getElementById('editItemId').value = '';
        document.getElementById('cancelEditBtn').classList.add('hidden');
        document.getElementById('imagePreview').style.display = 'none';
        togglePriceField();
        
        // Render items
        renderItems();
        
        // Scroll to marketplace
        scrollToSection('marketplace');
    };
    
    // Handle image if provided
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processItem(e.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        processItem();
    }
});

// View item details
function viewItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const seller = users.find(u => u.id === item.sellerId);
    
    const content = `
        <div style="margin-top: var(--space-24);">
            ${item.image ? `<img src="${item.image}" style="width: 100%; border-radius: var(--radius-base); margin-bottom: var(--space-20);" alt="${item.title}">` : '<div style="width: 100%; height: 300px; background-color: var(--color-secondary); border-radius: var(--radius-base); display: flex; align-items: center; justify-content: center; font-size: 72px; margin-bottom: var(--space-20);">📚</div>'}
            <h2 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-16); color: var(--color-text);">${item.title}</h2>
            <div style="display: flex; gap: var(--space-8); margin-bottom: var(--space-20);">
                <span class="badge badge-primary">${item.category}</span>
                ${item.transactionType === 'donate' ? '<span class="badge badge-success">Donate</span>' : `<span class="badge badge-warning">₹${item.price}</span>`}
            </div>
            <div style="margin-bottom: var(--space-16);">
                <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);"><strong>Subject:</strong> ${item.subject || 'N/A'}</p>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);"><strong>Course:</strong> ${item.course || 'N/A'}</p>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);"><strong>Posted on:</strong> ${item.createdAt}</p>
            </div>
            <div style="padding: var(--space-16); background-color: var(--color-secondary); border-radius: var(--radius-base); margin-bottom: var(--space-20);">
                <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); color: var(--color-text);">Description</h3>
                <p style="color: var(--color-text); line-height: 1.6;">${item.description || 'No description provided.'}</p>
            </div>
            <div style="padding: var(--space-16); background-color: var(--color-bg-1); border-radius: var(--radius-base);">
                <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); color: var(--color-text);">Seller Information</h3>
                <p style="color: var(--color-text); margin-bottom: var(--space-4);"><strong>Name:</strong> ${item.sellerName}</p>
                ${seller ? `<p style="color: var(--color-text);"><strong>Bio:</strong> ${seller.bio}</p>` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('itemDetailsContent').innerHTML = content;
    document.getElementById('itemDetailsModal').classList.add('active');
}

// Close item details
function closeItemDetails() {
    document.getElementById('itemDetailsModal').classList.remove('active');
}

// Edit item
function editItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item || !currentUser || currentUser.id !== item.sellerId) {
        showNotification('You can only edit your own items', 'error');
        return;
    }
    
    // Fill form with item data
    document.getElementById('editItemId').value = item.id;
    document.getElementById('itemTitle').value = item.title;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemSubject').value = item.subject || '';
    document.getElementById('itemCourse').value = item.course || '';
    document.getElementById('itemTransactionType').value = item.transactionType;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDescription').value = item.description || '';
    
    // Show image preview if exists
    if (item.image) {
        document.getElementById('previewImg').src = item.image;
        document.getElementById('imagePreview').style.display = 'block';
    }
    
    // Show cancel button
    document.getElementById('cancelEditBtn').classList.remove('hidden');
    
    // Toggle price field
    togglePriceField();
    
    // Scroll to form
    scrollToSection('post-item');
    
    showNotification('Editing item...', 'success');
}

// Cancel edit
function cancelEdit() {
    document.getElementById('postItemForm').reset();
    document.getElementById('editItemId').value = '';
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('imagePreview').style.display = 'none';
    togglePriceField();
}

// Delete item
function deleteItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item || !currentUser || currentUser.id !== item.sellerId) {
        showNotification('You can only delete your own items', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this item?')) {
        items = items.filter(i => i.id !== itemId);
        renderItems();
        showNotification('Item deleted successfully', 'success');
    }
}

// Show user profile
function showProfile() {
    if (!currentUser) return;
    
    const userItems = items.filter(i => i.sellerId === currentUser.id);
    
    const content = `
        <div style="text-align: center; margin-bottom: var(--space-24);">
            <div style="width: 80px; height: 80px; background-color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto var(--space-16); color: var(--color-btn-primary-text);">${currentUser.username.charAt(0).toUpperCase()}</div>
            <h3 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); color: var(--color-text);">${currentUser.username}</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">${currentUser.email}</p>
            <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">User ID: ${currentUser.id}</p>
        </div>
        <div style="padding: var(--space-16); background-color: var(--color-secondary); border-radius: var(--radius-base); margin-bottom: var(--space-20);">
            <h4 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); color: var(--color-text);">Bio</h4>
            <p style="color: var(--color-text);">${currentUser.bio}</p>
        </div>
        <div style="padding: var(--space-16); background-color: var(--color-bg-1); border-radius: var(--radius-base);">
            <h4 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--space-12); color: var(--color-text);">Your Listings</h4>
            <div style="display: flex; justify-content: space-around; text-align: center;">
                <div>
                    <p style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-primary); margin-bottom: var(--space-4);">${userItems.length}</p>
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Total Items</p>
                </div>
                <div>
                    <p style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-success); margin-bottom: var(--space-4);">${userItems.filter(i => i.transactionType === 'donate').length}</p>
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Donations</p>
                </div>
                <div>
                    <p style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-warning); margin-bottom: var(--space-4);">${userItems.filter(i => i.transactionType === 'sell').length}</p>
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">For Sale</p>
                </div>
            </div>
        </div>
        <div style="margin-top: var(--space-20); text-align: center;">
            <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Member since ${currentUser.createdAt}</p>
        </div>
    `;
    
    document.getElementById('profileContent').innerHTML = content;
    document.getElementById('profileModal').classList.add('active');
}

// Close profile
function closeProfile() {
    document.getElementById('profileModal').classList.remove('active');
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize app on load
window.addEventListener('DOMContentLoaded', init);