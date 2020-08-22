const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

// Always before routes.
// Without this the "request.body" wouldn't work (undefined).
app.use(express.json());

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
const projects = []; // Never in production.

// Middleware
function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};

// Middleware
function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
};

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const result = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(result);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

// Always when you use 'put' you have to declare which 'project' you wanna edit, example, 'id'.
// http://localhost:3333/projects/2
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  // if not found
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' })
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  // if not found
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' })
  }

  // splice to take one project inside of the array.
  projects.splice(projectIndex, 1);

  // return in 'blank'
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 The backend has just started!');
});


/**
 * Method HTTP:
 *
 * GET: Get the info from the back-end.
 * POST: Create one info in the back-end.
 * PUT/PATCH: Edit one info in the back-end.
 * DELETE: Delete one info in the back-end.
 */


/**
 * Params Type
 *
 * Query Params: filter and pagination.
 * Route Params: Identify resources (update/delete).
 * Request Body: Content when you create or edit on resource (JSON).
*/

/**
 * Middleware:
 *
 * Request interceptor that completely interrupts the request or changes request data.
 */
