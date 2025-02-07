import React from 'react';
import { useParams } from 'react-router-dom';
import { Code2, Clock, CheckCircle, XCircle } from 'lucide-react';
import VisualizationPanel from '../components/debugger/VisualizationPanel';
import { dataStructures } from '../data/dataStructures';

function DataStructureDetail() {
  const { id } = useParams<{ id: string }>();
  const ds = dataStructures[id || ''];

  if (!ds) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Data structure not found
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="w-8 h-8 text-sky-500 dark:text-sky-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {ds.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {ds.description}
              </p>
            </div>

            {/* Time Complexity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Time Complexity
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-400">Operation</th>
                      <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-400">Best</th>
                      <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-400">Average</th>
                      <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-400">Worst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ds.timeComplexity.map((tc) => (
                      <tr key={tc.operation} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 px-4 text-gray-900 dark:text-white">{tc.operation}</td>
                        <td className="py-2 px-4 font-mono text-sky-600 dark:text-sky-400">{tc.best}</td>
                        <td className="py-2 px-4 font-mono text-sky-600 dark:text-sky-400">{tc.average}</td>
                        <td className="py-2 px-4 font-mono text-sky-600 dark:text-sky-400">{tc.worst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Space Complexity: <span className="font-mono text-sky-600 dark:text-sky-400">{ds.spaceComplexity}</span>
              </div>
            </div>

            {/* Common Operations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Common Operations
              </h2>
              <div className="space-y-4">
                {ds.commonOperations.map((op) => (
                  <div key={op.name} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {op.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {op.description}
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-sm text-gray-900 dark:text-gray-100">
                      {op.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Visualization
              </h2>
              <div className="h-[300px]">
                <VisualizationPanel
                  data={ds.visualizationData}
                  type={ds.visualizationType}
                />
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advantages
                </h2>
              </div>
              <ul className="space-y-2">
                {ds.advantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-2">
                    <span className="text-emerald-500 dark:text-emerald-400">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-sky-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Disadvantages
                </h2>
              </div>
              <ul className="space-y-2">
                {ds.disadvantages.map((disadv) => (
                  <li key={disadv} className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{disadv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DataStructureDetail;