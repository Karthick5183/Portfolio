const projectsData = {
  project1: {
    title: 'Organizational Network using Cisco Packet Tracer',
    description: 'Designed and simulated a secure multi-department network using VLANs, routing protocols, and network segmentation.',
    features: ['Multi-VLAN implementation (HR, IT, Sales)','Router & switch configuration (CLI)','Security configuration & ACL policies','Optimized IP addressing for scalability'],
    github: 'https://github.com/Karthick5183/Organizational-Network-Using-Cisco-Packet-Tracer.git',
    outputs: ['organizational network.jpg']
  },
  project3: {
    title: 'Farmconnect - E-Commerce Business',
    description: 'A mobile app built to connect farmers directly with consumers, eliminating middlemen and improving produce accessibility.',
    features: ['Farmer & buyer dashboards','Order management with tracking','Simulated secure payments','Inventory & product listing system'],
    github: 'https://github.com/Karthick5183/Farmconnect.git',
    outputs: ['fc1.png','fc2.png','fc3.png','fc4.png','fc5.png','fc6.png','fc7.png','fc8.png','fc9.png','fc10.png']
  },
  project4: {
    title: 'Blood Bank Management System',
    description: 'Web application to manage donors and recipients, with registration, OTP verification and SMS alerts.',
    features: ['Donor & receiver registration','Blood group availability checking','SMS alert system','Admin dashboard'],
    github: 'https://github.com/Karthick5183/blood-bank-management.git',
    outputs: ['blood1.png','blood2.png','blood3.png','blood4.png','blood5.png']
  },
  project5: {
    title: 'IoT Based Smart Home Automation (Voice)',
    description: 'Voice-enabled home automation prototype using NodeMCU, IFTTT, Adafruit and Google Assistant.',
    features: ['Google Assistant voice commands','NodeMCU automation','Relay + sensor integration','Cloud-based Adafruit IO system'],
    github: 'https://github.com/Karthick5183/iot-home-automation.git',
    outputs: ['Smart home.jpg']
  },
  project6: {
    title: 'Patient Data Management System',
    description: 'CRUD-based hospital patient management system with secure login and role-based access.',
    features: ['Add / Update / Delete / View records','Role-based authentication','Responsive UI','MySQL structured database'],
    github: 'https://github.com/Karthick5183/patient-data-management.git',
    outputs: ['hb1.jpg','hb2.jpg','hb3.jpg','hb4.jpg','hb5.jpg','hb6.jpg']
  }
};

let currentProjectId = null;

function showResumeModal(){
  const modal = document.getElementById('resumeModal');
  const iframe = document.getElementById('resumeIframe');
  const img = document.getElementById('resumeImg');
  const fallback = document.getElementById('resumeFallbackMessage');
  const openBtn = document.getElementById('resumeOpenNewBtn');
  const dlBtn = document.getElementById('resumeDownloadBtn');
  if(!modal||!iframe||!img||!fallback||!openBtn||!dlBtn) return;
  const pdfFile='resume.pdf';
  const jpgFile='resume.jpg';
  const pngFile='resume.png';
  const altJpg='resume.pdf.jpg';
  const altExtra='resume.pdf.png';
  const candidates=[pdfFile,jpgFile,pngFile,altJpg,altExtra];
  iframe.classList.add('hidden');
  img.classList.add('hidden');
  fallback.classList.add('hidden');
  openBtn.href='#';
  dlBtn.href='#';
  dlBtn.removeAttribute('download');
  const checkImageExists=(src,cb)=>{
    const test=new Image();
    test.onload=()=>cb(true);
    test.onerror=()=>cb(false);
    test.src=src+'?cb='+Date.now();
  };
  (function tryCandidates(i){
    if(i>=candidates.length){
      iframe.src=pdfFile;
      iframe.classList.remove('hidden');
      openBtn.href=pdfFile;
      dlBtn.href=pdfFile;
      dlBtn.setAttribute('download','');
      modal.classList.remove('hidden');
      return;
    }
    const c=candidates[i];
    if(!c){tryCandidates(i+1);return}
    if(c.endsWith('.pdf')){tryCandidates(i+1);return}
    checkImageExists(c,function(exists){
      if(exists){
        img.src=c;
        img.classList.remove('hidden');
        openBtn.href=c;
        dlBtn.href=c;
        dlBtn.setAttribute('download','');
        modal.classList.remove('hidden');
      } else {
        tryCandidates(i+1);
      }
    });
  })(0);
  const closeBtn=document.getElementById('resumeCloseBtn');
  if(closeBtn) closeBtn.onclick=hideResumeModal;
}
function hideResumeModal(){
  const modal=document.getElementById('resumeModal');
  const iframe=document.getElementById('resumeIframe');
  const img=document.getElementById('resumeImg');
  if(modal) modal.classList.add('hidden');
  if(iframe){iframe.src='';iframe.classList.add('hidden')}
  if(img){img.src='';img.classList.add('hidden')}
}
window.showResumeModal=showResumeModal;
window.hideResumeModal=hideResumeModal;

function showProjectModal(projectId){
  const data=projectsData[projectId];
  if(!data) return;
  currentProjectId=projectId;
  const titleEl=document.getElementById('projectModalTitle');
  const descEl=document.getElementById('projectModalDescription');
  const featuresEl=document.getElementById('projectModalFeatures');
  const githubEl=document.getElementById('projectModalGithubLink');
  const outputsEl=document.getElementById('projectModalOutputs');
  const outputsGrid=document.getElementById('projectOutputsGrid');
  const noOut=document.getElementById('noOutputsText');
  if(titleEl) titleEl.textContent=data.title;
  if(descEl) descEl.textContent=data.description;
  if(githubEl){
    const gh=(data.github||'').trim();
    const isValid=gh&&(gh.startsWith('http://')||gh.startsWith('https://'));
    if(isValid){
      githubEl.href=gh;
      githubEl.target='_blank';
      githubEl.classList.remove('opacity-60','pointer-events-none');
      githubEl.setAttribute('aria-disabled','false');
      githubEl.onclick=function(){return true};
    } else {
      githubEl.href='javascript:void(0)';
      githubEl.removeAttribute('target');
      githubEl.classList.add('opacity-60','pointer-events-none');
      githubEl.setAttribute('aria-disabled','true');
      githubEl.onclick=function(ev){ev.preventDefault();const orig=githubEl.innerHTML;githubEl.innerHTML='No repo available';setTimeout(function(){githubEl.innerHTML=orig},1200);return false};
    }
  }
  if(featuresEl){
    featuresEl.innerHTML='';
    (data.features||[]).forEach(function(f){const li=document.createElement('li');li.textContent=f;featuresEl.appendChild(li)});
  }
  if(outputsGrid){
    outputsGrid.innerHTML='';
    const outputs=data.outputs||[];
    if(outputs.length===0){
      noOut.style.display='block';
    } else {
      noOut.style.display='none';
      const row=document.createElement('div');
      row.className='outputs-scroll';
      outputs.forEach(function(src){
        const wrapper=document.createElement('div');
        wrapper.className='output-item-wrapper';
        const img=document.createElement('img');
        img.src=src;
        img.alt=data.title+' output';
        img.className='rounded-lg border border-gray-700 cursor-pointer project-output-thumb';
        img.style.maxHeight='220px';
        img.style.width='auto';
        img.addEventListener('click',function(){
          const preview=document.getElementById('previewImg');
          const modal=document.getElementById('imagePreviewModal');
          preview.src=src;
          modal.classList.remove('hidden');
        });
        wrapper.appendChild(img);
        row.appendChild(wrapper);
      });
      outputsGrid.appendChild(row);
    }
  }
  if(outputsEl) outputsEl.classList.add('hidden');
  const modal=document.getElementById('projectModal');
  if(modal) modal.classList.remove('hidden');
}
function hideProjectModal(){const modal=document.getElementById('projectModal');if(modal) modal.classList.add('hidden');currentProjectId=null}
window.showProjectModal=showProjectModal;
window.hideProjectModal=hideProjectModal;

function toggleModalOutputs(){const outputsEl=document.getElementById('projectModalOutputs');if(!outputsEl) return;if(outputsEl.classList.contains('hidden')) outputsEl.classList.remove('hidden');else outputsEl.classList.add('hidden')}
window.toggleModalOutputs=toggleModalOutputs;

function openProjectOutputs(projectId){showProjectModal(projectId);const outputsEl=document.getElementById('projectModalOutputs');if(outputsEl) outputsEl.classList.remove('hidden')}
window.openProjectOutputs=openProjectOutputs;

function initImagePreview(){
  const imgs=document.querySelectorAll('img.image-gallery-item');
  imgs.forEach(function(img){img.addEventListener('click',function(){const src=img.getAttribute('src');if(!src) return;const modal=document.getElementById('imagePreviewModal');const preview=document.getElementById('previewImg');if(!modal||!preview) return;preview.src=src;modal.classList.remove('hidden');})});
  const imageModal=document.getElementById('imagePreviewModal');
  if(imageModal) imageModal.addEventListener('click',function(){imageModal.classList.add('hidden')});
}

function initContactForm(){
  const form=document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const name=(document.getElementById('name')||{}).value||'';
    const email=(document.getElementById('email')||{}).value||'';
    const message=(document.getElementById('message')||{}).value||'';
    const status=document.getElementById('formStatus');
    if(status) status.innerHTML='<span class="text-blue-400">Sending...</span>';
    const wpMsg='Hello, this is '+(name||'Guest')+'. Email: '+(email||'N/A')+'. Message: '+(message||'N/A');
    const wpNumber='917904567988';
    try{
      window.open('https://wa.me/'+wpNumber+'?text='+encodeURIComponent(wpMsg),'_blank');
      window.open('mailto:karthickjayavelu5@gmail.com?subject='+encodeURIComponent('Portfolio Message from '+(name||'Guest'))+'&body='+encodeURIComponent(wpMsg),'_blank');
    }catch(err){}
    setTimeout(function(){if(status) status.innerHTML='<span class="text-gold-400">Thank you '+(name||'')+'! Message initiated.</span>';form.reset();},900);
  });
}

function initSkillBars(){
  const bars=document.querySelectorAll('.skill-bar-inner');
  bars.forEach(function(bar){
    let percent=bar.style.getPropertyValue('--skill-percent')||'';
    if(!percent) percent=getComputedStyle(bar).getPropertyValue('--skill-percent')||'';
    percent=percent.trim();
    if(percent){
      if(percent.indexOf('%')===-1) percent=percent+'%';
      requestAnimationFrame(function(){bar.style.width=percent});
      const numeric=parseFloat(percent);
      if(!isNaN(numeric)){
        bar.setAttribute('role','progressbar');
        bar.setAttribute('aria-valuemin','0');
        bar.setAttribute('aria-valuemax','100');
        bar.setAttribute('aria-valuenow',String(Math.round(numeric)));
      }
    } else bar.style.width='0%';
  });
}

function initTooltipTap(){
  document.querySelectorAll('.skill-item').forEach(function(item){
    item.addEventListener('click',function(ev){
      if(window.innerWidth<=768){
        const tip=item.querySelector('.tooltip');
        if(!tip) return;
        const visible=tip.style.visibility==='visible'||getComputedStyle(tip).visibility==='visible';
        if(visible){tip.style.visibility='hidden';tip.style.opacity='0'}else{tip.style.visibility='visible';tip.style.opacity='1';tip.style.transform='translateX(-50%) translateY(0)'}
        ev.stopPropagation();
      }
    });
  });
}

function initSmoothScrollAndIcons(){
  try{if(typeof lucide!=='undefined'&&typeof lucide.createIcons==='function') lucide.createIcons()}catch(e){}
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(e){
      const href=link.getAttribute('href');
      if(!href||href==='#') return;
      const target=document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

document.addEventListener('DOMContentLoaded',function(){
  initSmoothScrollAndIcons();
  initImagePreview();
  initContactForm();
  initSkillBars();
  initTooltipTap();
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      hideResumeModal();
      hideProjectModal();
      const im=document.getElementById('imagePreviewModal');
      if(im) im.classList.add('hidden');
    }
  });
  const resumeModal=document.getElementById('resumeModal');
  if(resumeModal) resumeModal.addEventListener('click',function(ev){if(ev.target===resumeModal) hideResumeModal()});
  const projectModal=document.getElementById('projectModal');
  if(projectModal) projectModal.addEventListener('click',function(ev){if(ev.target===projectModal) hideProjectModal()});
  const openBtn=document.getElementById('resumeOpenNewBtn');
  if(openBtn) openBtn.addEventListener('click',function(e){if(openBtn.href==='#'||openBtn.href.trim()==='') e.preventDefault()});
});
