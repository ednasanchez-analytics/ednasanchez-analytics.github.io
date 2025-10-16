
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');
    data.forEach(project => {
      const div = document.createElement('div');
      div.className = 'project-card';
      div.innerHTML = `
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <p><strong>Tools:</strong> ${project.tools}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      container.appendChild(div);
    });
  });
