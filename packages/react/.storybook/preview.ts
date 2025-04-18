// .storybook/preview.js
export const parameters = {
    options: {
        storySort: {
            order: [
                "语音",
                [
                    "短语音合成",
                    "短语音测试"
                ],
            ],
            method: "explicit", // 严格按指定顺序
        },
    },
};
