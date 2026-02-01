import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TabView from '../components/TabView';
import Accordion from '../components/Accordion';
import QAList from '../components/QAItem';
import SearchBar from '../components/SearchBar';

// Import all tool data
import awsData from '../data/aws';
import gcpData from '../data/gcp';
import azureData from '../data/azure';
import terraformData from '../data/terraform';
import ansibleData from '../data/ansible';
import gitData from '../data/git';
import dockerData from '../data/docker';
import kubernetesData from '../data/kubernetes';
import jenkinsData from '../data/jenkins';
import gitlabData from '../data/gitlab';
import githubActionsData from '../data/github-actions';
import linuxData from '../data/linux';
import sreData from '../data/sre';
import prometheusData from '../data/prometheus';
import grafanaData from '../data/grafana';
import helmData from '../data/helm';
import vaultData from '../data/vault';
import argocdData from '../data/argocd';
import cloudformationData from '../data/cloudformation';
import bashData from '../data/bash';
import pythonData from '../data/python';
import yamlData from '../data/yaml';
import jsonData from '../data/json';

const toolsData = {
    aws: awsData,
    gcp: gcpData,
    azure: azureData,
    terraform: terraformData,
    ansible: ansibleData,
    git: gitData,
    docker: dockerData,
    kubernetes: kubernetesData,
    jenkins: jenkinsData,
    gitlab: gitlabData,
    'github-actions': githubActionsData,
    linux: linuxData,
    sre: sreData,
    prometheus: prometheusData,
    grafana: grafanaData,
    helm: helmData,
    vault: vaultData,
    argocd: argocdData,
    cloudformation: cloudformationData,
    bash: bashData,
    python: pythonData,
    yaml: yamlData,
    json: jsonData
};

function ToolPage() {
    const { toolId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const tool = toolsData[toolId];

    if (!tool) {
        return <Navigate to="/" replace />;
    }

    const filteredConcepts = useMemo(() => {
        if (!searchTerm.trim()) return tool.concepts;
        const term = searchTerm.toLowerCase();
        return tool.concepts.filter(concept =>
            concept.title.toLowerCase().includes(term) ||
            concept.content.toLowerCase().includes(term)
        );
    }, [tool.concepts, searchTerm]);

    const filteredQuestions = useMemo(() => {
        if (!searchTerm.trim()) return tool.questions;
        const term = searchTerm.toLowerCase();
        return tool.questions.filter(qa =>
            qa.question.toLowerCase().includes(term) ||
            qa.answer.toLowerCase().includes(term)
        );
    }, [tool.questions, searchTerm]);

    return (
        <div className="tool-page">
            <div className="tool-header">
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                    <h1>{tool.name}</h1>
                    <p>{tool.description}</p>
                </div>
            </div>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Search ${tool.name} concepts and questions...`}
            />

            <TabView tabs={['📖 Concepts & Notes', '❓ Interview Q&A']}>
                <Accordion items={filteredConcepts} />
                <QAList items={filteredQuestions} />
            </TabView>
        </div>
    );
}

export default ToolPage;
