// 获取页面元素 - 基于你的HTML结构
const navToggle = document.querySelector('#nav-links');
const menuBtn = document.querySelector('#menu-btn');
const navLinksElements = document.querySelectorAll('#nav-links a');
const sections = document.querySelectorAll('section, header');
const images = document.querySelectorAll('img[data-src]');
const navbar = document.querySelector('#navbar');

// 菜单切换功能
function toggleMenu() {
    const navLinks = document.querySelector('#nav-links');
    const menuIcon = document.querySelector('#menu-btn i');
    
    if (navLinks && menuIcon) {
        navLinks.classList.toggle('show');
        
        // 改变汉堡菜单图标
        if (navLinks.classList.contains('show')) {
            menuIcon.className = 'fa fa-times';
        } else {
            menuIcon.className = 'fa fa-bars';
        }
    }
}

// 点击菜单按钮事件
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

// 导航栏链接点击平滑滚动效果
navLinksElements.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // 计算目标位置，考虑固定导航栏高度
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            const navLinks = document.querySelector('#nav-links');
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const menuIcon = document.querySelector('#menu-btn i');
                if (menuIcon) {
                    menuIcon.className = 'fa fa-bars';
                }
            }
        }
    });
});

// 点击菜单链接后关闭菜单（移动端）
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('#nav-links');
        const menuIcon = document.querySelector('#menu-btn i');
        
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            if (menuIcon) {
                menuIcon.className = 'fa fa-bars';
            }
        }
    });
});

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('#nav-links');
    const menuIcon = document.querySelector('#menu-btn i');
    const navbarContainer = document.querySelector('#navbar');
    
    if (navbarContainer && !navbarContainer.contains(e.target) && navLinks && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        if (menuIcon) {
            menuIcon.className = 'fa fa-bars';
        }
    }
});

// 图片懒加载
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// 应用懒加载到所有带data-src的图片
images.forEach(image => {
    imageObserver.observe(image);
});

// 页面加载时的淡入动画效果
window.addEventListener('load', () => {
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
        
        // 错开动画时间
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// 活动展示部分图片鼠标悬停放大效果
const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach(item => {
    const eventImg = item.querySelector('.event-img');
    if (eventImg) {
        eventImg.addEventListener('mouseenter', () => {
            eventImg.style.transform = 'scale(1.1)';
            eventImg.style.transition = 'transform 0.3s ease';
        });
        
        eventImg.addEventListener('mouseleave', () => {
            eventImg.style.transform = 'scale(1)';
        });
    }
});

// 团队成员部分鼠标悬停效果
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    const memberImg = member.querySelector('.member-img');
    const memberInfo = member.querySelector('.member-info, p');
    
    if (memberImg && memberInfo) {
        // 关键修改：初始状态设置为显示
        memberInfo.style.opacity = '1';
        memberInfo.style.transform = 'translateY(0)';
        memberInfo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // 可选：如果想保留悬停图片时的其他效果（如微小放大）
        memberImg.addEventListener('mouseenter', () => {
            // 可以添加其他动画，比如文字颜色变化等
            memberInfo.style.color = '#2a9d8f'; // 示例：悬停时变色
        });
        
        memberImg.addEventListener('mouseleave', () => {
            // 恢复原始颜色
            memberInfo.style.color = '#457b9d';
        });
    }
});

// 滚动时导航栏样式变化
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 滚动时高亮当前导航项
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 70) + 10;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    let activated = false;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksElements.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`#nav-links a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
            activated = true;
        }
    });

    // 如果滚动到底部，强制高亮最后一个 section
    if (!activated && window.scrollY + windowHeight >= pageHeight - 5) {
        navLinksElements.forEach(link => link.classList.remove('active'));
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            const lastId = lastSection.getAttribute('id');
            const activeLink = document.querySelector(`#nav-links a[href="#${lastId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }
}

// 滚动时更新活跃导航链接
window.addEventListener('scroll', updateActiveNavLink);

// 页面加载完成后初始化活跃链接
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// 响应式处理 - 窗口大小改变时关闭移动菜单
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('#nav-links');
        const menuIcon = document.querySelector('#menu-btn i');
        
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            if (menuIcon) {
                menuIcon.className = 'fa fa-bars';
            }
        }
    }
});

// 平滑滚动到顶部功能（可选）
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 如果有返回顶部按钮，添加事件监听
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // 滚动时显示/隐藏返回顶部按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

