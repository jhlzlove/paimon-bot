function createArk24Message(title, subtitle, desc, img) {
    const message = {
        template_id: 24, kv: [
            { key: "#TITLE#", value: title },
            { key: "#SUBTITLE#", value: subtitle },
            { key: "#METADESC#", value: desc },
            { key: "#IMGC#", value: img },
        ]
    };
    return message;
}
