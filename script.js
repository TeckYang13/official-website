// 获取页面元素
const navLinks = document.getElementById('.navbar.nav-links li a');
const sections = document.getElementById('section, header, footer');
const images = document.getElementById('img');

// 导航栏菜单展开收起效果（针对移动端响应式，假设屏幕较小时隐藏菜单，点击按钮展开）

// 导航栏链接点击平滑滚动效果
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // 减去导航栏高度，实现平滑滚动到对应板块顶部
                behavior: 'smooth'
            });
            // 点击链接后关闭移动端展开的菜单（如果是移动端打开状态）
            if (navToggle.classList.contains('show')) {
                navToggle.classList.remove('show');
            }
        }
    });
});

// 图片懒加载示例（先简单模拟，使用 IntersectionObserver API，实际中可完善更多逻辑）
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // 替换真实图片路径
            observer.unobserve(img);
        }
    });
});
images.forEach(image => {
    if (image.dataset.src) {
        observer.observe(image);
    }
});

// 页面加载时淡入动画效果示例（给所有主要板块添加淡入效果，可根据实际调整选择器）
window.addEventListener('load', () => {
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transition = 'opacity 0.8s ease-in-out';
        setTimeout(() => {
            section.style.opacity = 1;
        }, 100); // 稍微延迟让动画有顺序感，可调整延迟时间
    });
});

// 活动展示部分图片鼠标悬停放大效果
const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach(item => {
    const eventImg = item.querySelector('.event-img');
    eventImg.addEventListener('mouseenter', () => {
        eventImg.style.transform = 'scale(1.1)';
        eventImg.style.transition = 'transform 0.3s ease';
    });
    eventImg.addEventListener('mouseleave', () => {
        eventImg.style.transform = 'scale(1)';
    });
});

// 团队成员部分图片鼠标悬停显示更多信息效果（简单示例，可进一步完善样式）
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    const memberImg = member.querySelector('.member-img');
    const memberInfo = member.querySelector('p');
    memberImg.addEventListener('mouseenter', () => {
        memberInfo.style.display = 'block';
        memberInfo.style.opacity = 1;
        memberInfo.style.transition = 'opacity 0.3s ease';
    });
    memberImg.addEventListener('mouseleave', () => {
        memberInfo.style.display = 'none';
    });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
