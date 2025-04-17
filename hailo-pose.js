module.exports = function (RED) {
    function HailoPoseNode(config) {
        RED.nodes.createNode(this, config);
        const { exec } = require("child_process");
        const node = this;

        node.hef = config.modelPath;
        node.input = config.sourceInput;

        node.on("input", function (msg) {
            const inputSource = node.input.toLowerCase() === "camera" ? "0" : node.input;

            const cmd = `
                cd ~/hailo_nodered_support &&
                source env/bin/activate &&
                python3 pose_estimation.py -n ${node.hef} -i ${inputSource}
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

    RED.nodes.registerType("hailo-pose", HailoPoseNode);
};
