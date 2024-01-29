let idleTimeout;

function startIdleTimer() {
  // Set the timeout to 15 minutes (adjust as needed)
  const timeoutDuration = 15 * 60 * 1000;

  idleTimeout = setTimeout(() => {
    // Redirect to the login page or show a modal
    window.location.href = '/login';
  }, timeoutDuration);
}

function resetIdleTimer() {
  // Reset the timeout when there is user activity
  clearTimeout(idleTimeout);
  startIdleTimer();
}

// Start the idle timer when the page loads
startIdleTimer();

// Listen for user activity events (e.g., mousemove, keydown)
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
