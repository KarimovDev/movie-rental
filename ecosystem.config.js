module.exports = {
    apps: [
        {
            name: "movie-rental",
            script: "node",
            args: "serverMovie.js",
	    exec_mode: "fork",
	    max_memory_restart: "200M",
	    restart_delay: "1000",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
}
