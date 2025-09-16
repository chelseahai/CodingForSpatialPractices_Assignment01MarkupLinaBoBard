// Houses or Museums? - Lina Bo Bardi Essay
// Interactive features for the semantically marked-up essay

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for better user experience
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add reading progress indicator
    function updateReadingProgress() {
        const article = document.querySelector('article');
        const articleHeight = article.offsetHeight;
        const articleTop = article.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(100, Math.max(0, 
            ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
        ));
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${progress}%;
            height: 3px;
            background: #000;
            z-index: 1000;
            transition: width 0.1s ease;
        `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress(); // Initial call

    // Add language toggle functionality
    function createLanguageToggle() {
        const toggle = document.createElement('button');
        toggle.textContent = 'Ver em Português';
        toggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            background: #fff;
            color: #000;
            border: 1px solid #000;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
            transition: background 0.3s ease;
        `;
        
        toggle.addEventListener('mouseenter', function() {
            this.style.background = '#000';
            this.style.color = '#fff';
        });
        
        toggle.addEventListener('mouseleave', function() {
            this.style.background = '#fff';
            this.style.color = '#000';
        });
        
        toggle.addEventListener('click', function() {
            const main = document.querySelector('main');
            const aside = document.querySelector('aside');
            
            if (main.style.display === 'none') {
                main.style.display = 'block';
                aside.style.display = 'none';
                this.textContent = 'Ver em Português';
            } else {
                main.style.display = 'none';
                aside.style.display = 'block';
                this.textContent = 'View in English';
            }
        });
        
        document.body.appendChild(toggle);
    }

    createLanguageToggle();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'l' || e.key === 'L') {
            const toggle = document.querySelector('button');
            if (toggle) toggle.click();
        }
    });

    // Add section highlighting on scroll
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop - windowHeight / 2 && 
                scrollTop < sectionTop + sectionHeight - windowHeight / 2) {
                section.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                section.style.transition = 'background-color 0.3s ease';
            } else {
                section.style.backgroundColor = 'transparent';
            }
        });
    }

    window.addEventListener('scroll', highlightCurrentSection);

    // Add print functionality
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.textContent = 'Print Essay';
        printBtn.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            padding: 10px 15px;
            background: #fff;
            color: #000;
            border: 1px solid #000;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
            transition: background 0.3s ease;
        `;
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        printBtn.addEventListener('mouseenter', function() {
            this.style.background = '#000';
            this.style.color = '#fff';
        });
        
        printBtn.addEventListener('mouseleave', function() {
            this.style.background = '#fff';
            this.style.color = '#000';
        });
        
        document.body.appendChild(printBtn);
    }

    addPrintButton();

    console.log('Houses or Museums? - Lina Bo Bardi essay loaded successfully');
    console.log('Press "L" to toggle between English and Portuguese versions');
});
