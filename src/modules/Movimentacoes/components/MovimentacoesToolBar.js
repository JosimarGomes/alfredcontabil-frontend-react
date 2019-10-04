import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'app-ui';
import { loadPlanoDeContas, loadContasBancarias } from 'modules/shared/redux';
import FormNovaReceita from '../forms/FormNovaReceita';
import FormNovaDespesa from '../forms/FormNovaDespesa';

class MovimentacoesToolBar extends Component {

    state = {
        visibleNovaReceita: false,
        visibleNovaDespesa: false,
    }

    componentDidMount() {
        this.props.loadPlanoDeContas();
        this.props.loadContasBancarias();

        // window.SpeechRecognition = window.SpeechRecognition ||
        //     window.webkitSpeechRecognition ||
        //     null;

        // //caso não suporte esta API DE VOZ                              
        // if (window.SpeechRecognition === null) {
        //     document.getElementById('unsupported').classList.remove('hidden');
        // } else {
        //     var recognizer = new window.SpeechRecognition();
        //     console.log("recognizer", recognizer);
        //     // var transcription = document.getElementById("transcription");

        //     //Para o reconhecedor de voz, não parar de ouvir, mesmo que tenha pausas no usuario
        //     recognizer.continuous = true

        //     recognizer.onresult = event => {
        //         // transcription.textContent = "";
        //         for (var i = event.resultIndex; i < event.results.length; i++) {
        //             if (event.results[i].isFinal) {
        //                 // transcription.textContent = event.results[i][0].transcript + ' (Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';
        //                 const frase = event.results[i][0].transcript.trim();

        //                 if (frase === "nova despesa") {
        //                     console.log("entrou")
        //                     this.newExpense()
        //                 } else if (frase === "nova receita") {
        //                     this.newRecipe()
        //                 }
        //             } else {
        //                 console.log(event.results[i][0].transcript);
        //             }
        //         }
        //     }


        // }

        // recognizer.start();
    }

    novaReceita = () => {
        this.setState({ visibleNovaReceita: true });
    }

    novaDespesa = () => {
        this.setState({ visibleNovaDespesa: true });
    }

    handleCancel = () => {
        this.setState({ visibleNovaReceita: false, visibleNovaDespesa: false });
    }

    render() {

        const { visibleNovaReceita, visibleNovaDespesa } = this.state;

        return (
            <Card>
                <FormNovaReceita
                    visible={visibleNovaReceita}
                    handleCancel={this.handleCancel}
                // wrappedComponentRef={form => this.formNewRecipe = form}
                />
                <FormNovaDespesa
                    visible={visibleNovaDespesa}
                    handleCancel={this.handleCancel}
                // wrappedComponentRef={form => this.formNewExpense = form}
                />
                <Button
                    onClick={this.novaReceita}
                    className="margin-10"
                    type="primary"
                >
                    Nova Receita
                </Button>
                <Button
                    onClick={this.novaDespesa}
                    className="margin-10"
                >
                    Nova Despesa
                </Button>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapActionsToProp = { loadPlanoDeContas, loadContasBancarias };

export default connect(mapStateToProps, mapActionsToProp)(MovimentacoesToolBar);
