const typeEffect = (tex,name, n=0, speed="90") => {
    if(n < (tex.length)) {
        let paragraph = document.querySelector(name);
        paragraph.textContent = tex.substring(0,n+1);
        n++;
        setTimeout(() => {
            typeEffect(tex,name,n)
        }, speed);
    }
}