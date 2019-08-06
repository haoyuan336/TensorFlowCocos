cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad() {
        const a = tf.variable(tf.scalar(Math.random()));
        const b = tf.variable(tf.scalar(Math.random()));
        const c = tf.variable(tf.scalar(Math.random()));
        const d = tf.variable(tf.scalar(Math.random()));
        function predict(x) {
            x.print();
            return tf.tidy(() => {
                let y  = a.mul(x.pow(tf.scalar(3)))
                    .add(b.mul(x.square()))
                    .add(c.mul(x))
                    .add(d);
                    y.print();
                    return y;
            });
        }
        function loss(predictions, labels) {
            const meanSquareErroe = predictions.sub(labels).square().mean();
            return meanSquareErroe;
        }
        function train(xs, ys, numInterations = 75) {
            const learningRate = 0.5;
            const optimizer = tf.train.sgd(learningRate);
            for (let i = 0; i < numInterations; i++) {
                optimizer.minimize(() => {
                    const predsYs = predict(xs);
                    return loss(predsYs, ys);
                })
            }
        }

        function getY(x) {
            return 10 * Math.pow(x, 3) + 20 * Math.pow(x, 2) + 30 * x + 40;
        }

        for (let i = 0; i < 10; i++) {
            let x = Math.random();
            let y = getY(x);
            train(tf.scalar(x), tf.scalar(y));
        }
        let endY = predict(tf.scalar(10));
        console.log('endY', endY.print());
        console.log("endY", getY(10));

    },

    start() {

    },

    update(dt) { }
});
