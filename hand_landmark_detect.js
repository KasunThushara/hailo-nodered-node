module.exports = function (RED) {
    function HailoHandLandmarkNode(config) {
        RED.nodes.createNode(this, config);
        const { exec } = require("child_process");
        const node = this;

        node.on("input", function (msg) {
            const cmd = `
                cd ~/hailo_nodered_support &&
                source env/bin/activate &&
                python3 live_detect.py -d hand
            `;

            const subprocess = exec(cmd, { shell: "/bin/bash" });

            subprocess.stdout.on("data", (data) => {
                node.send({ payload: data });
            });

            subprocess.stderr.on("data", (data) => {
                node.error(data.toString());
            });

            subprocess.on("close", (code) => {
                node.status({ fill: "green", shape: "dot", text: "finished" });
            });

            node.status({ fill: "blue", shape: "ring", text: "running" });
        });
    }

    RED.nodes.registerType("hailo-hand-landmark", HailoHandLandmarkNode);
};
